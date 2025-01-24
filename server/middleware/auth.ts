import { Request, Response, NextFunction } from "express";
import { db } from "@db";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, req.session.userId),
  });

  if (!user?.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
}
