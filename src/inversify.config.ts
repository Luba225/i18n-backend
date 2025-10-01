import { Container } from "inversify";
import { TYPES } from "./types";

// Controllers
import { UserController } from "./controllers/user.controller";
import { ViolationController } from "./controllers/violation.controller";
import { AuthController } from "./controllers/auth.controller";

// Services
import { UserService } from "./services/user.service";
import { ViolationService } from "./services/violation.service";

// Repositories
import { UserRepository } from "./repositories/user.repository";
import { ViolationRepository } from "./repositories/violation.repository";

const container = new Container();

// === User bindings ===
container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();

// === Violation bindings ===
container.bind<ViolationController>(TYPES.ViolationController).to(ViolationController).inSingletonScope();
container.bind<ViolationService>(TYPES.ViolationService).to(ViolationService).inSingletonScope();
container.bind<ViolationRepository>(TYPES.ViolationRepository).to(ViolationRepository).inSingletonScope();

// === Auth bindings ===
container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();

export { container };
