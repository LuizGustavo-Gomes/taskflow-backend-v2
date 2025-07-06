// src/routes/userRoutes.ts
import { Router } from 'express'; // Importe Router do express
import userController from '../controllers/userController.js';
const router = Router(); // Use Router()
router.post('/register', userController.register);
router.post('/login', userController.login);
export default router; // Use export default
//# sourceMappingURL=userRoutes.js.map