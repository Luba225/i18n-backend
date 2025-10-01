import Router from 'koa-router';
import { UserController } from '../controllers/user.controller';
import { container } from '../inversify.config';
import { TYPES } from '../types';

const router = new Router();
const userController = container.get<UserController>(TYPES.UserController);

router.get('/', async (ctx) => userController.findAll(ctx));
router.get('/:id', async (ctx) => userController.findOne(ctx));
router.post('/', async (ctx) => userController.create(ctx));
router.put('/:id', async (ctx) => userController.update(ctx));
router.delete('/:id', async (ctx) => userController.delete(ctx));

export default router;
