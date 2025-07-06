// Importe as funções específicas do userModel.js que você precisa
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
const userController = {
    async register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            return;
        }
        try {
            // **PASSO 1: Verificar se o email já existe**
            const existingUserByEmail = await UserModel.findByEmail(email);
            if (existingUserByEmail) {
                res.status(409).json({ message: 'Email já cadastrado.' });
                return;
            }
            // **PASSO 2: Verificar se o username já existe**
            const existingUserByUsername = await UserModel.findByUsername(username);
            if (existingUserByUsername) {
                res.status(409).json({ message: 'Nome de usuário já existe.' });
                return;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            // Se as verificações passaram, tente criar o usuário
            const newUser = await UserModel.create(username, email, hashedPassword);
            // Remove a senha do objeto antes de enviar a resposta
            const { password: _, ...userWithoutPassword } = newUser;
            res.status(201).json({ message: 'Usuário registrado com sucesso!', user: userWithoutPassword });
        }
        catch (error) { // Tipagem 'any' permite acessar 'code' e 'constraint'
            console.error('Erro ao registrar usuário:', error);
            // **Tratamento Específico para Erros de Unicidade do PostgreSQL (código '23505')**
            if (error.code === '23505') {
                // 'users_email_key' ou 'users_username_key' são nomes de constraints padrão
                // que o pg-migrate cria para colunas únicas.
                if (error.constraint === 'users_email_key') {
                    res.status(409).json({ message: 'Email já cadastrado.' });
                    return;
                }
                if (error.constraint === 'users_username_key') {
                    res.status(409).json({ message: 'Nome de usuário já existe.' });
                    return;
                }
                // Se for uma outra violação de unicidade inesperada
                res.status(409).json({ message: 'Um registro com os dados fornecidos já existe.' });
                return;
            }
            // Para qualquer outro erro não tratado especificamente
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    },
    // *** INÍCIO DO CÓDIGO DA FUNÇÃO DE LOGIN ***
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
            return;
        }
        try {
            // 1. Buscar o usuário pelo username
            const user = await UserModel.findByUsername(username);
            if (!user) {
                res.status(401).json({ message: 'Credenciais inválidas.' }); // Usuário não encontrado
                return;
            }
            // 2. Comparar a senha fornecida com a senha (hash) do banco de dados
            // É importante verificar se user.password existe antes de tentar comparar
            const isPasswordValid = user.password ? await bcrypt.compare(password, user.password) : false;
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Credenciais inválidas.' }); // Senha incorreta
                return;
            }
            // 3. Login bem-sucedido
            // Em uma aplicação real, aqui você geraria um JWT (JSON Web Token)
            // para autenticação e autorização futuras. Por enquanto, retornamos o ID do usuário
            // e os dados do usuário sem a senha.
            const { password: _, ...userWithoutPassword } = user;
            res.status(200).json({ message: 'Login bem-sucedido!', user: userWithoutPassword });
        }
        catch (error) {
            console.error('Erro no processo de login:', error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
    // *** FIM DO CÓDIGO DA FUNÇÃO DE LOGIN ***
};
export default userController;
//# sourceMappingURL=userController.js.map