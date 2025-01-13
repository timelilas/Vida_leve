import { HttpException } from "./HttpException";

export class ConflictException extends HttpException {
  constructor(message: string, resource: string, field?: string) {
    super({ status: 409, message, resource, field });
    this.name = "ConflictException";
  }
}
