import { QueryResult } from 'pg';
import connection from '../database/connection'
import { TOwner, TOwnerInput } from '../types/TOwner';


export class Owner {
  async findAll(): Promise<TOwner[][]> {
    return (await connection.query<TOwner[]>('SELECT * FROM igti.proprietarios')).rows
  }
  async findById(id: number): Promise<TOwner> {
    return (await connection.query<TOwner>(`SELECT * FROM igti.proprietarios WHERE proprietario_id = $1`, [id])).rows[0];
  }
  async create(owner: TOwnerInput): Promise<void> {
    await connection.query(`INSERT INTO igti.proprietarios(nome, telefone) VALUES($1, $2)`, [owner.nome, owner.telefone]);
  }
  async update(owner: TOwnerInput, id: number): Promise<QueryResult> {
    return await connection.query(`
    UPDATE igti.proprietarios
    SET nome=$1, telefone=$2
    WHERE proprietario_id=$3`, [owner.nome, owner.telefone, id])
  }
  async delete(id: number): Promise<QueryResult> {
    return await connection.query(`DELETE FROM igti.proprietarios
      WHERE proprietario_id=$1`, [id])
  }
}