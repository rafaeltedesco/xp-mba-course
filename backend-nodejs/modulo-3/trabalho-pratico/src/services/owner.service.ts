import { Animal } from '../models/Animal';
import { Owner } from '../models/Owner';
import { TOwner } from '../types/TOwner';
import ownerValidator from './validators/ownerValidator';

const ownerModel = new Owner();
const animalModel = new Animal();

export class OwnerService {
  async findAll(): Promise<TOwner[][]> {
    const owners = await ownerModel.findAll();
    return owners;
  }

  async findById(ownerId: number): Promise<TOwner | undefined> {
    const owner = await ownerModel.findById(ownerId);
    return owner;
  }

  async create(data: any): Promise<{ error: boolean, message?: string }> {
    const owner = ownerValidator.validate(data)
    await ownerModel.create(owner);
    return { error: false }
  }

  async update(data: any, id: number): Promise<{ error: boolean, message?: string, type?: string }> {
    const owner = ownerValidator.validate(data);
    const result = await ownerModel.update(owner, id);
    if (result.rowCount === 0) return { error: true, message: `Owner with id ${id} not found!`, type: 'NOT_FOUND' }
    return { error: false }
  }

  async delete(id: number): Promise<{ error: boolean, message?: string, type?: string }> {
    const animals = await animalModel.findAllByOwner(Number(id));
    if (animals.length > 0) {
      return { error: true, message: 'Cannot delete owner with animals', type: 'UNAUTHORIZED'}
    }
    const result = await ownerModel.delete(Number(id));
    if (result.rowCount === 0) return { error: true, message: `Owner with id ${id} not found!` }
    return { error: false }

  }
}