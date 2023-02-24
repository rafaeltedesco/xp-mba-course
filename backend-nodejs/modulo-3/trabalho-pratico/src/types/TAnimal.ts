

export type TAnimal = {
  animal_id: number,
  nome: string,
  tipo: string | null
  proprietario_id: number,
}

export type TAnimalInput = Omit<TAnimal, 'animal_id'>