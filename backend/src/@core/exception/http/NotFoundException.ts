import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(message: string, resource: string, field?: string) {
    super({ status: 404, message, resource, field });
    this.name = "NotFoundException";
  }
}
