import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { puppies } from "@db/schema";
import { eq } from "drizzle-orm";
import { isAuthenticated, isAdmin } from "./middleware/auth";

export function registerRoutes(app: Express): Server {
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