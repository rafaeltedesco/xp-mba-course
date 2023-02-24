import { Response } from 'express';


abstract class HttpResponse {
  constructor(private res: Response, private status: number) {}

  sendResponse(message?: any) {
    return this.res.status(this.status).json(message);
  }
}

class HttpResponse500 extends HttpResponse {
  constructor(res: Response) {
    super(res, 500)
  }
}

class HttpResponseOK extends HttpResponse {
  constructor(res: Response) {
    super(res, 200)
  }
}

class HttpResponseBadRequest extends HttpResponse {
  constructor(res: Response) {
    super(res, 400)
  }
}

class HttpResponseNotFound extends HttpResponse {
  constructor(res: Response) {
    super(res, 404)
  }
}

class HttpResponseUnauthorized extends HttpResponse {
  constructor(res: Response) {
    super(res, 401)
  }
}

class HttpResponseCreated extends HttpResponse {
  constructor(res: Response) {
    super(res, 201)
  }
}

class HttpResponseNoContent extends HttpResponse {
  constructor(res: Response) {
    super(res, 204)
  }
}

export {
  HttpResponse500, 
  HttpResponseBadRequest, 
  HttpResponseOK, 
  HttpResponseUnauthorized,
  HttpResponseNotFound,
  HttpResponseCreated,
  HttpResponseNoContent
}