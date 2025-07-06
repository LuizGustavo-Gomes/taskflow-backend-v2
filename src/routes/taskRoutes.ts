// src/routes/taskRoutes.ts
import { Router } from 'express';
import taskController from '../controllers/taskController.js'; // Lembre-se do .js!

const router = Router();

// Rotas de Tarefa
// CREATE: Criar uma nova tarefa para um usuário
router.post('/', taskController.createTask); // Ex: POST /api/tasks (user_id no body)

// READ: Buscar todas as tarefas de um usuário (user_id no param ou query)
router.get('/:userId', taskController.getTasksByUserId); // Ex: GET /api/tasks/1 (user_id 1)

// READ: Buscar uma única tarefa de um usuário
router.get('/:userId/:id', taskController.getTaskById); // Ex: GET /api/tasks/1/10 (user_id 1, task_id 10)

// UPDATE: Atualizar uma tarefa
router.put('/:userId/:id', taskController.updateTask); // Ex: PUT /api/tasks/1/10 (user_id 1, task_id 10)

// DELETE: Deletar uma tarefa
router.delete('/:userId/:id', taskController.deleteTask); // Ex: DELETE /api/tasks/1/10 (user_id 1, task_id 10)

export default router;