// src/app.ts
import express from 'express'; // Importe os tipos
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
const app = express(); // Tipagem para o app
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => {
    res.send('API TaskFlow (TypeScript) funcionando!');
});
export default app;
//# sourceMappingURL=app.js.map