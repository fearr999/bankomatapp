import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/auth.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: { userId: string; role: string; organizationId: string; contractorOrganizationId: string | null };
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Не авторизован" });
  }
  try {
    const payload = verifyToken(header.slice("Bearer ".length));
    req.auth = {
      userId: payload.userId,
      role: payload.role,
      organizationId: payload.organizationId,
      contractorOrganizationId: payload.contractorOrganizationId ?? null,
    };
    next();
  } catch {
    return res.status(401).json({ error: "Токен недействителен или истёк" });
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res.status(403).json({ error: "Недостаточно прав" });
    }
    next();
  };
}

/// Блокирует доступ пользователям подрядчика (contractorOrganizationId задан) —
/// для роутов, которые видны только банку целиком (дашборд, аналитика, склад, AI, CRM).
export function blockContractor(req: Request, res: Response, next: NextFunction) {
  if (req.auth?.contractorOrganizationId) {
    return res.status(403).json({ error: "Недоступно для подрядчика" });
  }
  next();
}
