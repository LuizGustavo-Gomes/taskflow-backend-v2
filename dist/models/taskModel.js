import pool from '../config/database.js'; // Lembre-se do .js!
const TaskModel = {
    // CREATE: Criar uma nova tarefa
    async create(newTask) {
        const { title, description, user_id, due_date } = newTask; // MUDANÇA: Adicionado due_date
        try {
            const result = await pool.query(
            // MUDANÇA CRÍTICA AQUI: A query INSERT deve usar 'due_date'
            'INSERT INTO tasks (title, description, user_id, due_date) VALUES ($1, $2, $3, $4) RETURNING id, title, description, completed, user_id, created_at, due_date', // MUDANÇA: Retorna due_date
            [title, description || null, user_id, due_date || null] // MUDANÇA: Passa due_date como valor
            );
            return result.rows[0];
        }
        catch (error) {
            console.error('Erro no modelo ao criar tarefa:', error);
            throw error;
        }
    },
    // READ: Buscar todas as tarefas de um usuário
    async findByUserId(userId) {
        try {
            // MUDANÇA CRÍTICA AQUI: A query SELECT deve usar 'due_date'
            const result = await pool.query('SELECT id, title, description, completed, user_id, created_at, due_date FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', // MUDANÇA: Seleciona due_date
            [userId]);
            return result.rows;
        }
        catch (error) {
            console.error('Erro no modelo ao buscar tarefas por user_id:', error);
            throw error;
        }
    },
    // READ: Buscar uma única tarefa por ID e user_id (garantir que o usuário só veja suas tarefas)
    async findByIdAndUserId(taskId, userId) {
        try {
            // MUDANÇA CRÍTICA AQUI: A query SELECT deve usar 'due_date'
            const result = await pool.query('SELECT id, title, description, completed, user_id, created_at, due_date FROM tasks WHERE id = $1 AND user_id = $2', // MUDANÇA: Seleciona due_date
            [taskId, userId]);
            return result.rows[0];
        }
        catch (error) {
            console.error('Erro no modelo ao buscar tarefa por ID e user_id:', error);
            throw error;
        }
    },
    // UPDATE: Atualizar uma tarefa
    async update(taskId, userId, updateData) {
        const setParts = [];
        const values = [];
        let paramIndex = 1;
        if (updateData.title !== undefined) {
            setParts.push(`title = $${paramIndex++}`);
            values.push(updateData.title);
        }
        if (updateData.description !== undefined) {
            setParts.push(`description = $${paramIndex++}`);
            // Garante que a descrição seja null se for uma string vazia para o banco
            values.push(updateData.description === '' ? null : updateData.description);
        }
        if (updateData.completed !== undefined) {
            setParts.push(`completed = $${paramIndex++}`);
            values.push(updateData.completed);
        }
        if (updateData.due_date !== undefined) {
            setParts.push(`due_date = $${paramIndex++}`);
            // Converte a data para string ISO ou define como null se for undefined/null
            values.push(updateData.due_date instanceof Date ? updateData.due_date.toISOString() : (updateData.due_date || null));
        }
        // Se não houver nada para atualizar, retorne undefined
        if (setParts.length === 0) {
            console.warn('Nenhum dado fornecido para atualização na função update do modelo.');
            return undefined;
        }
        // Adiciona os IDs da tarefa e do usuário no final dos valores
        // Estes serão os últimos parâmetros na cláusula WHERE
        values.push(taskId);
        values.push(userId);
        try {
            const query = `
                UPDATE tasks
                SET ${setParts.join(', ')}
                WHERE id = $${paramIndex++} AND user_id = $${paramIndex++}
                RETURNING id, title, description, completed, user_id, created_at, due_date
            `;
            const result = await pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            console.error('Erro no modelo ao atualizar tarefa:', error);
            throw error;
        }
    },
    // DELETE: Deletar uma tarefa (Esta função permanece a mesma)
    async delete(taskId, userId) {
        try {
            const result = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [taskId, userId]);
            return result.rowCount > 0;
        }
        catch (error) {
            console.error('Erro no modelo ao deletar tarefa:', error);
            throw error;
        }
    }
};
export default TaskModel;
//# sourceMappingURL=taskModel.js.map