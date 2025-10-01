import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import userRoute from './routes/user.route';
import violationRoute from './routes/violation.route';
import authRoute from './routes/auth.routes';
import { connectToDatabase } from './database';
import { errorHandler } from './middleware/error-handler';

export async function bootstrap() {
  const app = new Koa();

  app.use(errorHandler);
  app.use(bodyParser());

  const api = new Router({ prefix: '/api' });
  api.use(authRoute.routes());
  api.use(authRoute.allowedMethods());
  api.use(userRoute.routes());
  api.use(userRoute.allowedMethods());
  api.use(violationRoute.routes());
  api.use(violationRoute.allowedMethods());

  app.use(api.routes()).use(api.allowedMethods());

  await connectToDatabase();

  const PORT = 3000;
  app.listen(3000, '0.0.0.0', () => {
  console.log('🟢 Server started on http://0.0.0.0:3000');
  });
 }

bootstrap();
