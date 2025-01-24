import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { puppies, users } from "@db/schema";
import { eq } from "drizzle-orm";
import { isAuthenticated, isAdmin } from "./middleware/auth";
import bcrypt from "bcryptjs";

export function registerRoutes(app: Express): Server {
  // Authentication routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await db.query.users.findFirst({
        where: eq(users.username, username)
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ message: "Logged in successfully" });
    } catch (error) {
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
      const newPuppy = await db.insert(puppies).values(req.body);
      res.json(newPuppy);
    } catch (error) {
      res.status(500).json({ message: "Failed to create puppy" });
    }
  });

  app.put('/api/admin/puppies/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await db.update(puppies)
        .set(req.body)
        .where(eq(puppies.id, parseInt(id)));
      res.json({ message: "Puppy updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update puppy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}