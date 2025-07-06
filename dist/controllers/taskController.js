import TaskModel from '../models/taskModel.js';
const taskController = {
    // CREATE Task
    async createTask(req, res) {
        // Por enquanto, vamos obter o user_id do corpo da requisição para testes.
        // **IMPORTANTE:** No futuro, remova isso e use req.userId do JWT!
        const { title, description, user_id } = req.body; // user_id temporariamente no body
        if (!title || !user_id) { // user_id é obrigatório para associar a tarefa
            res.status(400).json({ message: 'Título e ID do usuário são obrigatórios.' });
            return;
        }
        const newTaskData = { title, description, user_id };
        try {
            const newTask = await TaskModel.create(newTaskData);
            res.status(201).json({ message: 'Tarefa criada com sucesso!', task: newTask });
        }
        catch (error) {
            console.error('Erro ao criar tarefa:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao criar tarefa.' });
        }
    },
    // READ All Tasks for a User
    async getTasksByUserId(req, res) {
        // Por enquanto, vamos obter o user_id dos parâmetros ou query para testes.
        // **IMPORTANTE:** No futuro, remova isso e use req.userId do JWT!
        const userId = parseInt(req.params.userId || req.query.userId); // user_id temporariamente via param/query
        if (isNaN(userId)) {
            res.status(400).json({ message: 'ID do usuário inválido.' });
            return;
        }
        try {
            const tasks = await TaskModel.findByUserId(userId);
            res.status(200).json(tasks);
        }
        catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao buscar tarefas.' });
        }
    },
    // READ Single Task by ID for a User
    async getTaskById(req, res) {
        const taskId = parseInt(req.params.id);
        // **IMPORTANTE:** No futuro, user_id virá do req.userId do JWT!
        const userId = parseInt(req.params.userId || req.query.userId); // user_id temporariamente via param/query
        if (isNaN(taskId) || isNaN(userId)) {
            res.status(400).json({ message: 'ID da tarefa ou ID do usuário inválido.' });
            return;
        }
        try {
            const task = await TaskModel.findByIdAndUserId(taskId, userId);
            if (task) {
                res.status(200).json(task);
            }
            else {
                res.status(404).json({ message: 'Tarefa não encontrada ou não pertence a este usuário.' });
            }
        }
        catch (error) {
            console.error('Erro ao buscar tarefa:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao buscar tarefa.' });
        }
    },
    // UPDATE Task
    async updateTask(req, res) {
        const taskId = parseInt(req.params.id);
        // **IMPORTANTE:** No futuro, user_id virá do req.userId do JWT!
        const userId = parseInt(req.params.userId || req.query.userId); // user_id temporariamente via param/query
        const updateData = req.body;
        if (isNaN(taskId) || isNaN(userId)) {
            res.status(400).json({ message: 'ID da tarefa ou ID do usuário inválido.' });
            return;
        }
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
            return;
        }
        try {
            const updatedTask = await TaskModel.update(taskId, userId, updateData);
            if (updatedTask) {
                res.status(200).json({ message: 'Tarefa atualizada com sucesso!', task: updatedTask });
            }
            else {
                res.status(404).json({ message: 'Tarefa não encontrada ou não pertence a este usuário.' });
            }
        }
        catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao atualizar tarefa.' });
        }
    },
    // DELETE Task
    async deleteTask(req, res) {
        const taskId = parseInt(req.params.id);
        // **IMPORTANTE:** No futuro, user_id virá do req.userId do JWT!
        const userId = parseInt(req.params.userId || req.query.userId); // user_id temporariamente via param/query
        if (isNaN(taskId) || isNaN(userId)) {
            res.status(400).json({ message: 'ID da tarefa ou ID do usuário inválido.' });
            return;
        }
        try {
            const deleted = await TaskModel.delete(taskId, userId);
            if (deleted) {
                res.status(204).send(); // 204 No Content para deleções bem-sucedidas
            }
            else {
                res.status(404).json({ message: 'Tarefa não encontrada ou não pertence a este usuário.' });
            }
        }
        catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao deletar tarefa.' });
        }
    }
};
export default taskController;
//# sourceMappingURL=taskController.js.map