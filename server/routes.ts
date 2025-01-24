import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { puppies, users, lineageRelationships } from "@db/schema";
import { eq, and } from "drizzle-orm";
import { isAuthenticated, isAdmin } from "./middleware/auth";
import bcrypt from "bcryptjs";

export function registerRoutes(app: Express): Server {
  // Authentication routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(`Login attempt for username: ${username}`);

      const user = await db.query.users.findFirst({
        where: eq(users.username, username)
      });

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      console.log(`Password validation result: ${isValid}`);

      if (!isValid) {
        console.log('Invalid password');
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ message: "Logged in successfully" });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get('/api/auth/check', isAuthenticated, async (req, res) => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, req.session.userId!)
      });
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Failed to check auth status" });
    }
  });

  // Public API routes
  app.get('/api/puppies', async (_req, res) => {
    try {
      const availablePuppies = await db.query.puppies.findMany({
        where: eq(puppies.available, true)
      });
      res.json(availablePuppies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puppies" });
    }
  });

  // Admin routes
  app.get('/api/admin/puppies', isAuthenticated, isAdmin, async (_req, res) => {
    try {
      const allPuppies = await db.query.puppies.findMany();
      res.json(allPuppies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puppies" });
    }
  });

  app.post('/api/admin/puppies', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const result = await db.insert(puppies).values(req.body).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ message: "Failed to create puppy" });
    }
  });

  app.put('/api/admin/puppies/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db
        .update(puppies)
        .set(req.body)
        .where(eq(puppies.id, parseInt(id)))
        .returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ message: "Failed to update puppy" });
    }
  });

  app.delete('/api/admin/puppies/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await db
        .delete(puppies)
        .where(eq(puppies.id, parseInt(id)));
      res.json({ message: "Puppy deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete puppy" });
    }
  });

  // Lineage API routes
  app.get('/api/puppies/:id/lineage', async (req, res) => {
    try {
      const { id } = req.params;

      // Get the puppy's parents
      const parents = await db.query.lineageRelationships.findMany({
        where: eq(lineageRelationships.puppyId, parseInt(id)),
        with: {
          parent: true,
        },
      });

      // Get the puppy's children
      const children = await db.query.lineageRelationships.findMany({
        where: eq(lineageRelationships.parentId, parseInt(id)),
        with: {
          puppy: true,
        },
      });

      // Format the data for the tree visualization
      const lineageData = {
        puppy: await db.query.puppies.findFirst({
          where: eq(puppies.id, parseInt(id))
        }),
        parents: parents.map(p => ({
          ...p.parent,
          relationshipType: p.relationshipType
        })),
        children: children.map(c => ({
          ...c.puppy,
          relationshipType: c.relationshipType
        }))
      };

      res.json(lineageData);
    } catch (error) {
      console.error('Error fetching lineage:', error);
      res.status(500).json({ message: "Failed to fetch lineage data" });
    }
  });

  app.post('/api/admin/lineage', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { puppyId, parentId, relationshipType } = req.body;

      // Validate relationship type
      if (!['father', 'mother'].includes(relationshipType)) {
        return res.status(400).json({ message: "Invalid relationship type" });
      }

      // Check if relationship already exists
      const existingRelation = await db.query.lineageRelationships.findFirst({
        where: and(
          eq(lineageRelationships.puppyId, puppyId),
          eq(lineageRelationships.parentId, parentId)
        ),
      });

      if (existingRelation) {
        return res.status(400).json({ message: "Relationship already exists" });
      }

      const result = await db.insert(lineageRelationships)
        .values({
          puppyId,
          parentId,
          relationshipType,
        })
        .returning();

      res.json(result[0]);
    } catch (error) {
      console.error('Error creating lineage relationship:', error);
      res.status(500).json({ message: "Failed to create lineage relationship" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}