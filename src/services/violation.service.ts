import { injectable, inject } from "inversify";
import { ViolationRepository } from "../repositories/violation.repository";
import { TYPES } from "../types";

@injectable()
export class ViolationService {
  constructor(@inject(TYPES.ViolationRepository) private violationRepository: ViolationRepository) {}

  async findAll() {
    return this.violationRepository.findAll();
  }

  async findOne(id: string) {
    return this.violationRepository.findOne(id);
  }

  async create(data: any) {
    return this.violationRepository.create(data);
  }

  async update(id: string, data: any) {
    return this.violationRepository.update(id, data);
  }

  async delete(id: string) {
    return this.violationRepository.delete(id);
  }
}
