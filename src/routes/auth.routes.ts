import Router from 'koa-router';
import { AuthController } from '../controllers/auth.controller';
import { container } from '../inversify.config';
import { TYPES } from '../types';

const router = new Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/register', async (ctx) => authController.register(ctx));
router.post('/login', async (ctx) => authController.login(ctx));

export default router;
