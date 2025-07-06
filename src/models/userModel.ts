// src/models/userModel.ts
import { Pool, QueryResult } from 'pg';
import pool from '../config/database.js'; // Importe como default

// Interface para um usuário no banco de dados
export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    created_at: Date;
}

// Interface para os dados de criação de um novo usuário
export interface NewUser {
    username: string;
    email: string;
    password: string;
}

const UserModel = {
    async create(username: string, email: string, hashedPassword: string): Promise<User> {
        const result: QueryResult<User> = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
            [username, email, hashedPassword]
        );
        return result.rows[0];
    },

    async findByEmail(email: string): Promise<User | undefined> {
        const result: QueryResult<User> = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    async findByUsername(username: string): Promise<User | undefined> { // Adicionei essa função que estava faltando no seu código
        const result: QueryResult<User> = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },

    async findById(id: number): Promise<User | undefined> {
        const result: QueryResult<User> = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
    // ... outros métodos para atualizar, deletar, etc.
};

export default UserModel; // Mantenha apenas este export default