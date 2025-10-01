"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
// Controllers
const user_controller_1 = require("./controllers/user.controller");
const violation_controller_1 = require("./controllers/violation.controller");
const auth_controller_1 = require("./controllers/auth.controller");
// Services
const user_service_1 = require("./services/user.service");
const violation_service_1 = require("./services/violation.service");
// Repositories
const user_repository_1 = require("./repositories/user.repository");
const violation_repository_1 = require("./repositories/violation.repository");
const container = new inversify_1.Container();
exports.container = container;
// === User bindings ===
container.bind(types_1.TYPES.UserController).to(user_controller_1.UserController).inSingletonScope();
container.bind(types_1.TYPES.UserService).to(user_service_1.UserService).inSingletonScope();
container.bind(types_1.TYPES.UserRepository).to(user_repository_1.UserRepository).inSingletonScope();
// === Violation bindings ===
container.bind(types_1.TYPES.ViolationController).to(violation_controller_1.ViolationController).inSingletonScope();
container.bind(types_1.TYPES.ViolationService).to(violation_service_1.ViolationService).inSingletonScope();
container.bind(types_1.TYPES.ViolationRepository).to(violation_repository_1.ViolationRepository).inSingletonScope();
// === Auth bindings ===
container.bind(types_1.TYPES.AuthController).to(auth_controller_1.AuthController).inSingletonScope();
