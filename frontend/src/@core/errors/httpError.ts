interface HttpErrorParams {
  message: string;
  status: number;
  field?: string;
}

export class HttpError extends Error {
  public field?: string;
  public status: number;

  constructor({ message, field, status }: HttpErrorParams) {
    super(message);
    this.name = "HttpError";
    this.field = field;
    this.status = status;
    Error.captureStackTrace(this, HttpError);
  }
}
