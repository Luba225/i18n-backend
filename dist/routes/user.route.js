"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../types");
const router = new koa_router_1.default();
const userController = inversify_config_1.container.get(types_1.TYPES.UserController);
router.get('/', async (ctx) => userController.findAll(ctx));
router.get('/:id', async (ctx) => userController.findOne(ctx));
router.post('/', async (ctx) => userController.create(ctx));
router.put('/:id', async (ctx) => userController.update(ctx));
router.delete('/:id', async (ctx) => userController.delete(ctx));
exports.default = router;
