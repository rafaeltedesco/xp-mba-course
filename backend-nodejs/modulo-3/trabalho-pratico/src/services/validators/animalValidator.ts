import z from 'zod';

const animalSchema = z.object({
  nome: z.string(),
  tipo: z.string(),
  proprietario_id: z.number()
})

const validate = (data: any) => {
  const result = animalSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.message);
  return result.data;
}

export default {
  validate
}