import { injectable, inject } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { TYPES } from "../types";

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async comparePassword(user: any, password: string) {
    return bcrypt.compare(password, user.password);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
