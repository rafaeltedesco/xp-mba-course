import z from 'zod'


const postSchema = z.object({
    titulo: z.string(),
    conteudo: z.string(),
})

const validate = (data: any) => {
    const result = postSchema.safeParse(data)
    if (!result.success) throw new Error(result.error.message)
    return result.data
}

export default {
    validate
}