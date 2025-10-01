import { injectable, inject } from "inversify";
import { Context } from "koa";
import { UserService } from "../services/user.service";
import { TYPES } from "../types";

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async findAll(ctx: Context) {
    try {
      const users = await this.userService.findAll();
      ctx.body = users;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error fetching users" };
    }
  }

  async findOne(ctx: Context) {
    try {
      const { id } = ctx.params;
      const user = await this.userService.findOne(id);
      if (!user) {
        ctx.status = 404;
        ctx.body = { message: "User not found" };
        return;
      }
      ctx.body = user;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error fetching user" };
    }
  }

  async create(ctx: Context) {
    try {
      const data = ctx.request.body;
      const user = await this.userService.create(data);
      ctx.status = 201;
      ctx.body = user;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error creating user" };
    }
  }

  async update(ctx: Context) {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body;
      const updatedUser = await this.userService.update(id, data);
      ctx.body = updatedUser;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error updating user" };
    }
  }

  async delete(ctx: Context) {
    try {
      const { id } = ctx.params;
      await this.userService.delete(id);
      ctx.status = 204;
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Error deleting user" };
    }
  }
}
