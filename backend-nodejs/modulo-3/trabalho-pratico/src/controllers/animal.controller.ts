import { Request, Response } from 'express';
import { Animal } from '../models/Animal';
import { Owner } from '../models/Owner';
import animalValidator from '../services/validators/animalValidator';
import { HttpResponse500, HttpResponseCreated, HttpResponseNoContent, HttpResponseNotFound, HttpResponseOK, HttpResponseUnauthorized } from '../utils/http/httpResponses';
import { AnimalService } from '../services/animal.service';

const animalService = new AnimalService();

export class AnimalController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const { query: { proprietario_id } } = req
    if (!!proprietario_id) {
      const animals = await animalService.findAllByOwner(Number(proprietario_id));
      return new HttpResponseOK(res).sendResponse({
        length: animals.length,
        animals
      })
    }
    const animals = await animalService.findAll();
    return new HttpResponseOK(res).sendResponse(animals);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { params: { id } } = req;
    const animal = await animalService.findById(Number(id));
    if (!animal) {
      return new HttpResponseNotFound(res).sendResponse({
        message: `Animal with id ${id} not found!`
      })
    }
    return new HttpResponseOK(res).sendResponse(animal);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const created = await animalService.create(req.body);

      if (created.error) {
        return new HttpResponseUnauthorized(res).sendResponse({
          message: created.message
        })
      }

      return new HttpResponseCreated(res).sendResponse({
        message: 'New Animal created!'
      });
    }
    catch (err) {
      if (err instanceof Error) {
        return new HttpResponseUnauthorized(res).sendResponse({
          message: err.message
        })
      }
    }

    return new HttpResponse500(res).sendResponse({
      message: 'INTERNAL SERVER ERROR'
    })

  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updated = await animalService.update(req.body, Number(req.params.id));

      if (updated.error) {
        if (updated.type === 'UNAUTHORIZED')
          return new HttpResponseUnauthorized(res).sendResponse({
            message: updated.message
          })

        return new HttpResponseNotFound(res).sendResponse({
          message: `Animal with id ${req.params.id} not found!`
        })

      }
      return new HttpResponseOK(res).sendResponse({
        message: 'Animal updated'
      })
    }
    catch (err) {
      if (err instanceof Error) {
        return new HttpResponseUnauthorized(res).sendResponse({
          message: err.message
        })
      }
    }

    return new HttpResponse500(res).sendResponse({
      message: 'INTERNAL SERVER ERROR'
    })

  }
  async delete(req: Request, res: Response): Promise<Response> {
    const { params: { id } } = req;
    const deleted = await animalService.delete(Number(id));
    if (deleted.error) {
      return new HttpResponseNotFound(res).sendResponse({
        message: deleted.message
      })
    }
    return new HttpResponseNoContent(res).sendResponse();
  }
}