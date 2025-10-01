"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../types");
const router = new koa_router_1.default();
const authController = inversify_config_1.container.get(types_1.TYPES.AuthController);
router.post('/register', async (ctx) => authController.register(ctx));
router.post('/login', async (ctx) => authController.login(ctx));
exports.default = router;
