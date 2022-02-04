export class NotFoundHttpError extends Error{
  constructor(public statusCode = 404) {
    super();
  }
}