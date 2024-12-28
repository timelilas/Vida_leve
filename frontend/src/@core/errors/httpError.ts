interface HttpErrorParams {
  message: string;
  path: string;
  field?: string;
  status: number;
  timestamp: Date;
}

export class HttpError extends Error {
  public field?: string;
  public status: number;
  public path: string;
  public timestamp: Date;

  constructor({ message, field, status, path, timestamp }: HttpErrorParams) {
    super(message);
    this.name = "HttpError";
    this.field = field;
    this.status = status;
    this.path = path;
    this.timestamp = timestamp;
    Error.captureStackTrace(this, HttpError);
  }
}
