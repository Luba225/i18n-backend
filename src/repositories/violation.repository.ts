import { injectable } from "inversify";
import ViolationModel from "../models/violation.schema";

@injectable()
export class ViolationRepository {
  async findAll() {
    return ViolationModel.find();
  }

  async findOne(id: string) {
    return ViolationModel.findById(id);
  }

  async create(data: any) {
    return ViolationModel.create(data);
  }

  async update(id: string, data: any) {
    return ViolationModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return ViolationModel.findByIdAndDelete(id);
  }
}
