import { Animal } from "../models/Animal";
import { Servico } from "../models/Servico"
import serviceValidator from "./validators/serviceValidator";

const servicoModel = new Servico();
const animalModel = new Animal()

export class ServicoService {
    async findAll() {
        return servicoModel.findAll();
    }
    async findAllPetServicesByOwner(owner_id: number) {
        return servicoModel.findAllPetServicesByOwner(owner_id);
    }
    async create(data: any) {
        const serviceData = serviceValidator.validate(data);
        const petExists = await animalModel.findById(serviceData.animal_id)
        if (!petExists) throw new Error('invalid Pet')
         await servicoModel.create(serviceData)
    }
}