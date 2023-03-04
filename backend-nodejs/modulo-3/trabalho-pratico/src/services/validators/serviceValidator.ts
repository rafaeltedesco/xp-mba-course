import z from 'zod';

const serviceSchema = z.object({
    descricao: z.string(),
    valor: z.number(),
    animal_id: z.number()
})

const validate = (data: any) => {
 const result = serviceSchema.safeParse(data)
 if (!result.success) throw new Error(result.error.message)
 return result.data  
}

export default {
    validate
}