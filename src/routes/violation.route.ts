import { container } from '../inversify.config';
import { TYPES } from '../types';
import { ViolationController } from '../controllers/violation.controller';

const violationController = container.get<ViolationController>(TYPES.ViolationController);

export default violationController.router;
