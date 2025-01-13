import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {
  constructor(message: string, resource: string, field?: string) {
    super({ status: 400, message, resource, field });
    this.name = "BadRequestException";
  }
}
