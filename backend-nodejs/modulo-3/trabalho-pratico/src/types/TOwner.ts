

export type TOwner = {
  proprietario_id: number,
  nome: string,
  telefone: string
};

export type TOwnerInput = Omit<TOwner, 'proprietario_id'>;