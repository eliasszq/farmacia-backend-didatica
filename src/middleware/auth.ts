import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verificarToken(req: Request, res: Response, next: NextFunction) {
  const [tipo, token] = (req.headers.authorization ?? "").split(" ");
  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ mensagem: "Token não informado." });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return next();
  } catch {
    return res.status(401).json({ mensagem: "Sessão expirada ou token inválido. Faça login novamente." });
  }
}