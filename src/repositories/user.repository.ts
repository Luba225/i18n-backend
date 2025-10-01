import { injectable } from 'inversify';
import UserModel from '../models/user.schema';

@injectable()
export class UserRepository {
  async findAll() {
    return UserModel.find();
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async create(data: any) {
    return UserModel.create(data);
  }
}
