import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ViolationRepository } from '../repositories/violation.repository';

@injectable()
export class ViolationService {
  constructor(@inject(TYPES.ViolationRepository) private repo: ViolationRepository) {}

  async getAll() {
    return this.repo.findAll();
  }

  async create(data: any) {
    return this.repo.create(data);
  }
}
