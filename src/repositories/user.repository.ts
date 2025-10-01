import { injectable } from "inversify";
import UserModel from "../models/user.schema";

@injectable()
export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findAll() {
    return UserModel.find();
  }

  async findOne(id: string) {
    return UserModel.findById(id);
  }

  async create(data: any) {
    return UserModel.create(data);
  }

  async update(id: string, data: any) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}
