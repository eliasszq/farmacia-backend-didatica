import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const database = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
export interface UsuarioBD {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: string;
}

export class Usuario {
  static async buscarPorEmail(email: string): Promise<UsuarioBD | null> {
    const resposta = await database.query(
      `SELECT id, nome, email, senha, role FROM usuarios WHERE email = $1;`,
      [email]
    );
    return resposta.rows[0] ?? null;
  }
}