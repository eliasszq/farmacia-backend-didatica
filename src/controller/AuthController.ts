import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../model/Usuarios.js";

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body ?? {};
      if (!email || !senha) {
        return res.status(400).json({ mensagem: "Informe e-mail e senha." });
      }

      const usuario = await Usuario.buscarPorEmail(String(email).trim().toLowerCase());
      if (!usuario || !(await bcrypt.compare(String(senha), usuario.senha))) {
        return res.status(401).json({ mensagem: "E-mail ou senha inválidos." });
      }

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, role: usuario.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "8h" }
      );

      return res.status(200).json({
        token,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
      });
    } catch (error) {
      console.error(`Erro no login. ${error}`);
      return res.status(500).json({ mensagem: "Erro ao fazer login." });
    }
  }
}