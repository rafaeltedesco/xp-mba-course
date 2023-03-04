import { Request, Response } from 'express';
import { HttpResponse500, HttpResponseBadRequest, HttpResponseCreated, HttpResponseNoContent, HttpResponseNotFound, HttpResponseOK, HttpResponseUnauthorized } from '../utils/http/httpResponses';
import { OwnerService } from '../services/owner.service';

const ownerService = new OwnerService();

export class OwnerController {
  async findAll(req: Request, res: Response): Promise<Response> {
    const owners = await ownerService.findAll();
    return new HttpResponseOK(res).sendResponse(owners)
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { params: { id } } = req
    const owner = await ownerService.findById(Number(id));
    if (!owner) {
      return new HttpResponseNotFound(res).sendResponse({
        message: `Owner with id ${id} not found!`
      })
    }
    return new HttpResponseOK(res).sendResponse(owner);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      await ownerService.create(req.body);
      return new HttpResponseCreated(res).sendResponse({
        message: `New owner created!`
      })
    }
    catch (err) {
      if (err instanceof Error) {
        return new HttpResponseBadRequest(res).sendResponse({ message: err.message })
      }
    }

    return new HttpResponse500(res).sendResponse({
      message: 'INTERNAL SERVER ERROR'
    })

  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const result = await ownerService.update(req.body, Number(req.params.id));
      if (result.error) {
        return new HttpResponseNotFound(res).sendResponse({
          message: result.message
        })
      }
      return new HttpResponseOK(res).sendResponse({
        message: `Owner updated`
      })
    }
    catch (err) {
      if (err instanceof Error) {
        return new HttpResponseBadRequest(res).sendResponse({
          message: err.message
        })
      }
    }

    return new HttpResponse500(res).sendResponse({
      message: 'INTERNAL SERVER ERROR'
    })

  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const result = await ownerService.delete(Number(req.params.id));
      if (result.error) {
        if (result.type === 'UNAUTHORIZED') {
          return new HttpResponseUnauthorized(res).sendResponse({
            message: result.message
          })
        }
        return new HttpResponseNotFound(res).sendResponse({ message: result.message })
      }
      return new HttpResponseNoContent(res).sendResponse();
    }
    catch (err) {
      if (err instanceof Error) {
        return new HttpResponseBadRequest(res).sendResponse({
          err: err.message
        })
      }
    }
    return new HttpResponse500(res).sendResponse({
      message: 'INTERNAL SERVER ERROR'
    })
  }
}