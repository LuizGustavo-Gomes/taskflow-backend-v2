// src/config/database.ts
import 'dotenv/config'; // Carrega as variáveis de ambiente
import pg from 'pg';

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432', 10),
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente idle do DB', err);
  process.exit(-1);
});

console.log('Conexão com o banco de dados configurada.');

export default pool;