import pool from '../config/database.js'; // Importe como default
const UserModel = {
    async create(username, email, hashedPassword) {
        const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at', [username, email, hashedPassword]);
        return result.rows[0];
    },
    async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },
    async findByUsername(username) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
    async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
    // ... outros métodos para atualizar, deletar, etc.
};
export default UserModel; // Mantenha apenas este export default
//# sourceMappingURL=userModel.js.map