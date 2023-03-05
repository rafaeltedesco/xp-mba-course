import z from 'zod'

const commentSchema = z.object({
    postId: z.string(),
    nome: z.string(),
    conteudo: z.string()
})

const validate = (data:any) => {
    const result = commentSchema.safeParse(data)
    if (!result.success) throw new Error(result.error.message)
    return result.data
}

export default {
    validate
}