import { Exception } from "../@shared/Exception";

interface HttpExceptionParams {
  message: string;
  status: number;
  resource: string;
  field?: string;
}

export class HttpException extends Exception {
  public field?: string;

  constructor(params: HttpExceptionParams) {
    const { message, resource, status, field } = params;

    super({ message, resource, status });
    this.field = field;
    this.name = "HttpException";
  }
}
