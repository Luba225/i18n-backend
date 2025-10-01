import { injectable, inject } from "inversify";
import { Context } from "koa";
import { UserService } from "../services/user.service";
import { TYPES } from "../types";
import jwt from "jsonwebtoken";

@injectable()
export class AuthController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async register(ctx: Context) {
    try {
      const { name, email, password } = ctx.request.body as {
        name: string;
        email: string;
        password: string;
      };

      if (!name || !email || !password) {
        ctx.status = 400;
        ctx.body = { message: "Fill all fields" };
        return;
      }

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        ctx.status = 400;
        ctx.body = { message: "User already exists" };
        return;
      }

      const newUser = await this.userService.create({ name, email, password });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "7d",
      });

      ctx.status = 201;
      ctx.body = { token, user: newUser };
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Registration error" };
    }
  }

  async login(ctx: Context) {
    try {
      const { email, password } = ctx.request.body as { email: string; password: string };

      if (!email || !password) {
        ctx.status = 400;
        ctx.body = { message: "Fill all fields" };
        return;
      }

      const user = await this.userService.findByEmail(email);
      if (!user || !(await this.userService.comparePassword(user, password))) {
        ctx.status = 400;
        ctx.body = { message: "Invalid credentials" };
        return;
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "7d",
      });

      ctx.body = { token, user };
    } catch (err: unknown) {
      ctx.status = 500;
      ctx.body = { message: (err as Error).message || "Login error" };
    }
  }
}
