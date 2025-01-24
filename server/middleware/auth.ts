import { Request, Response, NextFunction } from "express";
import { db } from "@db";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session?.userId) {
      console.log('Session missing userId:', req.session);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, req.session.userId),
    });

    if (!user) {
      console.log('User not found for session userId:', req.session.userId);
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session?.userId) {
      console.log('Session missing userId in admin check:', req.session);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, req.session.userId),
    });

    if (!user?.isAdmin) {
      console.log('User not admin:', user);
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}