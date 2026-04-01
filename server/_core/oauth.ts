import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { hashPassword, comparePassword, createSessionToken } from "./auth";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export function registerAuthRoutes(app: Express) {
  // ── Login ────────────────────────────────────────────────────────────────
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ error: "Email e senha são obrigatórios." });
      return;
    }

    const user = await db.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Email ou senha inválidos." });
      return;
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Email ou senha inválidos." });
      return;
    }

    await db.updateLastSignedIn(user.id);

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: ONE_YEAR_MS });
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  // ── Logout ───────────────────────────────────────────────────────────────
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    res.json({ success: true });
  });

  // ── Setup do primeiro admin ───────────────────────────────────────────────
  // Só funciona se não existir nenhum admin no banco ainda.
  app.post("/api/auth/setup", async (req: Request, res: Response) => {
    const { name, email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ error: "Email e senha são obrigatórios." });
      return;
    }

    const adminExists = await db.adminExists();
    if (adminExists) {
      res.status(403).json({ error: "Setup já realizado. Acesso negado." });
      return;
    }

    const passwordHash = await hashPassword(password);
    await db.createUser({ name: name ?? null, email, passwordHash, role: "admin" });

    res.json({ success: true, message: "Admin criado com sucesso! Agora faça login." });
  });
}

// manter export antigo para compatibilidade com index.ts
export const registerOAuthRoutes = registerAuthRoutes;
