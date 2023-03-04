import { QueryResult } from 'pg';
import connection from '../database/connection';
import { TAnimal, TAnimalInput } from '../types/TAnimal';


export class Animal {
  async findAll(): Promise<TAnimal[][]> {
    return (await connection.query('SELECT * FROM igti.animais')).rows    
  }
  async findById(id: number): Promise<TAnimal> {
    return (await connection.query(`
      SELECT * FROM igti.animais WHERE animal_id = $1`, [id])).rows[0];
  }
  async create(animal: TAnimalInput): Promise<void> {
    await connection.query(`INSERT INTO igti.animais (nome, tipo, proprietario_id)
      VALUES ($1, $2, $3)`, [animal.nome, animal.tipo, animal.proprietario_id]);
  }
  async update(animal: TAnimalInput, id: number): Promise<QueryResult> {
    return await connection.query(`UPDATE igti.animais
      SET nome=$1, tipo=$2, proprietario_id=$3
      WHERE animal_id=$4`, [animal.nome, animal.tipo, animal.proprietario_id, id])
  }
  async delete(id: number): Promise<QueryResult> {
    return await connection.query(`DELETE FROM igti.animais
      WHERE animal_id=$1`, [id])
  }
  async findAllByOwner(owner_id: number): Promise<TAnimal[][]> {
    return (await connection.query<TAnimal[]>(`SELECT * FROM igti.animais
      WHERE proprietario_id=$1`, [owner_id])).rows
  }
}