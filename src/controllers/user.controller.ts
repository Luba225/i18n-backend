import { injectable, inject } from 'inversify';
import Router from 'koa-router';
import { TYPES } from '../types';
import { UserService } from '../services/user.service';
import { Context } from 'koa';

@injectable()
export class UserController {
  public router: Router;

  constructor(@inject(TYPES.UserService) private userService: UserService) {
    this.router = new Router({ prefix: '/users' });

    this.router.get('/', this.getUsers.bind(this));
    this.router.get('/:id', this.getUserById.bind(this));
  }

  async getUsers(ctx: Context) {
    try {
      const users = await this.userService.getAll();
      ctx.body = users;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: err.message };
    }
  }

  async getUserById(ctx: Context) {
    try {
      const user = await this.userService.getById(ctx.params.id);
      if (!user) {
        ctx.status = 404;
        ctx.body = { message: 'User not found' };
        return;
      }
      ctx.body = user;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: err.message };
    }
  }
}
