import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

/// Гейт для панели владельца платформы — намеренно отдельный от обычной
/// JWT-авторизации: это единственное место в системе, которое видит все
/// организации сразу, поэтому не привязано ни к какой роли/тенанту, только
/// к общему секрету (PLATFORM_ADMIN_SECRET), известному только владельцу.
export function requireOwnerSecret(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.PLATFORM_ADMIN_SECRET;
  if (!expected) {
    return res.status(503).json({ error: "PLATFORM_ADMIN_SECRET не настроен на сервере" });
  }
  const provided = req.headers["x-admin-secret"];
  if (typeof provided !== "string" || !timingSafeEqual(provided, expected)) {
    return res.status(401).json({ error: "Неверный секрет" });
  }
  next();
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
