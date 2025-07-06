// src/server.ts
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor (TypeScript) rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map