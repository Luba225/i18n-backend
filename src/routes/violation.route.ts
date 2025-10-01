import Router from 'koa-router';
import { ViolationController } from '../controllers/violation.controller';
import { container } from '../inversify.config';
import { TYPES } from '../types';

const router = new Router();
const violationController = container.get<ViolationController>(TYPES.ViolationController);

router.get('/', async (ctx) => violationController.findAll(ctx));
router.get('/:id', async (ctx) => violationController.findOne(ctx));
router.post('/', async (ctx) => violationController.create(ctx));
router.put('/:id', async (ctx) => violationController.update(ctx));
router.delete('/:id', async (ctx) => violationController.delete(ctx));

export default router;
