import z from 'zod';

const ownerSchema = z.object({
  nome: z.string(),
  telefone: z.string(),
})

const validate = (data: any)=> {
  const ownerData = ownerSchema.safeParse(data);
  if (!ownerData.success) throw new Error(ownerData.error.message)
  return ownerData.data  
}

export default {
  validate
};