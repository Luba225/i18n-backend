import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { UserRepository } from '../repositories/user.repository';

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepo: UserRepository) {}

  async getAll() {
    return this.userRepo.findAll();
  }

  async getById(id: string) {
    return this.userRepo.findById(id);
  }

  async create(userData: any) {
    return this.userRepo.create(userData);
  }
}
