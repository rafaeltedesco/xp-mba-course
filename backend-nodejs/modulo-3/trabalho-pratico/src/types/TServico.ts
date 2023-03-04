

export type TServico = {
    servico_id: number,
    descricao: string,
    valor: number,
    animal_id: number,
}

export type TPetServiceByOwner = {
    animal: string,
    tipo: string,
    proprietario: string,
    telefone: string
} & Omit<TServico, 'animal_id'>;

export type TServicoInput = Omit<TServico, 'servico_id'>