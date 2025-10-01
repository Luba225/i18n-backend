import { injectable } from 'inversify';
import ViolationModel from '../models/violation.schema';

@injectable()
export class ViolationRepository {
  async findAll() {
    return ViolationModel.find();
  }

  async create(data: any) {
    return ViolationModel.create(data);
  }
}
