import { Context } from 'koa';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.schema';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const register = async (ctx: Context) => {
  try {
    const { name, email, password } = ctx.request.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: 'User already exists' };
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    ctx.body = { token, user: { _id: user._id, name: user.name, email: user.email } };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Registration error', error };
  }
};

export const login = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email });
    if (!user) {
      ctx.status = 400;
      ctx.body = { message: 'Invalid email or password' };
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      ctx.status = 400;
      ctx.body = { message: 'Invalid email or password' };
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    ctx.body = { token, user: { _id: user._id, name: user.name, email: user.email } };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Login error', error };
  }
};