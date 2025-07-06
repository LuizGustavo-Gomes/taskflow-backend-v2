// src/app.ts
import express, { Application, Request, Response } from 'express'; // Importe os tipos
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';



const app: Application = express(); // Tipagem para o app

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => { // Tipagem para req e res
    res.send('API TaskFlow (TypeScript) funcionando!');
});

export default app;