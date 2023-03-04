import { Request, Response } from "express";
import { HttpResponseBadRequest, HttpResponseOK } from "../utils/http/httpResponses";
import { ServicoService } from "../services/servico.service"; 

const servicoService = new ServicoService();

export class ServicoController {
    async findAll(req: Request, res: Response) {
        const {query: { proprietario_id: owner_id }} = req
        console.log(owner_id, 'oooooo')
        if (!!owner_id) {
            const petServicesByOwner = await servicoService.findAllPetServicesByOwner(Number(owner_id))
            return new HttpResponseOK(res).sendResponse(petServicesByOwner)
        }
        const servicos = await servicoService.findAll()
        return new HttpResponseOK(res).sendResponse(servicos)
    }
    async create(req: Request, res: Response) {
        try {
            await servicoService.create(req.body);
            return new HttpResponseOK(res).sendResponse({
                message: 'created!'
            })
        }
        catch(err) {
            const error: Error = err as Error     
            return new HttpResponseBadRequest(res).sendResponse({
                message: error.message
            })           
        }
    }
}