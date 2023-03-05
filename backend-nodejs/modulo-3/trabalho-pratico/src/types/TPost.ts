import { TComment } from "./TComment"

export type TPostInput = {
    titulo: string,
    conteudo: string
}

export type TPostOutput = {
    _id: string,
    titulo: string,
    conteudo: string,
    comentarios: Array<TComment>
}

