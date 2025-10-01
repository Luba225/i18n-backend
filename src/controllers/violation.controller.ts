import { injectable, inject } from "inversify";
import { Context } from "koa";
import { ViolationService } from "../services/violation.service";
import { TYPES } from "../types";

@injectable()
export class ViolationController {
  constructor(@inject(TYPES.ViolationService) private violationService: ViolationService) {}

  async findAll(ctx: Context) {
    try {
      const violations = await this.violationService.findAll();
      ctx.body = violations;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error fetching violations" };
    }
  }

  async findOne(ctx: Context) {
    try {
      const { id } = ctx.params;
      const violation = await this.violationService.findOne(id);
      if (!violation) {
        ctx.status = 404;
        ctx.body = { message: "Violation not found" };
        return;
      }
      ctx.body = violation;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error fetching violation" };
    }
  }

  async create(ctx: Context) {
    try {
      const data = ctx.request.body;
      const violation = await this.violationService.create(data);
      ctx.status = 201;
      ctx.body = violation;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error creating violation" };
    }
  }

  async update(ctx: Context) {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body;
      const updatedViolation = await this.violationService.update(id, data);
      ctx.body = updatedViolation;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error updating violation" };
    }
  }

  async delete(ctx: Context) {
    try {
      const { id } = ctx.params;
      await this.violationService.delete(id);
      ctx.status = 204;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error deleting violation" };
    }
  }
}
