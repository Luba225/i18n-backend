import { injectable, inject } from 'inversify';
import Router from 'koa-router';
import { TYPES } from '../types';
import { ViolationService } from '../services/violation.service';
import { Context } from 'koa';

@injectable()
export class ViolationController {
  public router: Router;

  constructor(@inject(TYPES.ViolationService) private violationService: ViolationService) {
    this.router = new Router({ prefix: '/violations' });

    this.router.get('/', this.getViolations.bind(this));
    this.router.post('/', this.createViolation.bind(this));
  }

  async getViolations(ctx: Context) {
    try {
      const violations = await this.violationService.getAll();
      ctx.body = violations;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: err.message };
    }
  }

  async createViolation(ctx: Context) {
    try {
      const violation = await this.violationService.create(ctx.request.body);
      ctx.status = 201;
      ctx.body = violation;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: err.message };
    }
  }
}
