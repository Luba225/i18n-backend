"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const violation_route_1 = __importDefault(require("./routes/violation.route"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const database_1 = require("./database");
const error_handler_1 = require("./middleware/error-handler");
async function bootstrap() {
    const app = new koa_1.default();
    app.use(error_handler_1.errorHandler);
    app.use((0, koa_bodyparser_1.default)());
    const api = new koa_router_1.default({ prefix: '/api' });
    api.use(auth_routes_1.default.routes());
    api.use(auth_routes_1.default.allowedMethods());
    api.use(user_route_1.default.routes());
    api.use(user_route_1.default.allowedMethods());
    api.use(violation_route_1.default.routes());
    api.use(violation_route_1.default.allowedMethods());
    app.use(api.routes()).use(api.allowedMethods());
    await (0, database_1.connectToDatabase)();
    const PORT = 3000;
    app.listen(3000, '0.0.0.0', () => {
        console.log('🟢 Server started on http://0.0.0.0:3000');
    });
}
bootstrap();
