import { Animal } from '../models/Animal';
import { Owner } from '../models/Owner';
import { TAnimal } from '../types/TAnimal';
import animalValidator from './validators/animalValidator';

const animalModel = new Animal();
const ownerModel = new Owner();

export class AnimalService {
  async findAll(): Promise<TAnimal[][]> {
    const animals = await animalModel.findAll();
    return animals;
  }

  async findAllByOwner(ownerId: number): Promise<TAnimal[][]> {
    const animals = await animalModel.findAllByOwner(ownerId);
    return animals
  }

  async findById(animalId: number): Promise<TAnimal | undefined> {
    const animal = await animalModel.findById(animalId);
    return animal;
  }

  async create(data: any): Promise<{ error: boolean, message?: string }> {
    const animal = animalValidator.validate(data)
    const ownerExists = await ownerModel.findById(animal.proprietario_id);
    if (!ownerExists) return { error: true, message: '`Cannot create and Animal with invalid Owner Id' }
    await animalModel.create(animal);
    return { error: false }
  }

  async update(data: any, id: number): Promise<{ error: boolean, message?: string, type?: string }> {
    const animal = animalValidator.validate(data);
    const ownerExists = await ownerModel.findById(animal.proprietario_id);
    if (!ownerExists) return { error: true, message: `Cannot update animal with invalid owner id`, type: 'UNAUTHORIZED' }
    const result = await animalModel.update(animal, id);
    if (result.rowCount === 0) return { error: true, message: `Animal with id ${id} not found!`, type: 'NOT_FOUND' }
    return { error: false }
  }

  async delete(id: number): Promise<{ error: boolean, message?: string }> {
    const result = await animalModel.delete(Number(id));
    if (result.rowCount === 0) return { error: true, message: `Animal with id ${id} not found!` }
    return { error: false }

  }
}