import connection from "../database/connection";
import { TPetServiceByOwner, TServico, TServicoInput } from "../types/TServico";


export class Servico {
    async findAll(): Promise<TServico[][]> {
        return (await connection.query<TServico[]>('SELECT * FROM igti.servicos')).rows
    }
    async findAllPetServicesByOwner(ownerId: number): Promise<TPetServiceByOwner[][]> {
        return (await connection.query<TPetServiceByOwner[]>(`
        SELECT s.servico_id, s.descricao, s.valor, a.nome animal, a.tipo,
         p.nome proprietario, p.telefone FROM igti.servicos s 
        INNER JOIN igti.animais a ON a.animal_id = s.animal_id
        INNER JOIN igti.proprietarios p ON p.proprietario_id = a.proprietario_id
        WHERE s.animal_id IN (SELECT animal_id FROM igti.animais WHERE proprietario_id = $1)`, [ownerId])).rows
    }
    async create(serviceData: TServicoInput) {
        return connection.query(`
        INSERT INTO igti.servicos (descricao, valor, animal_id)
        VALUES ($1, $2, $3)`, [serviceData.descricao, serviceData.valor, serviceData.animal_id])
    }
}
