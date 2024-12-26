import { HttpException } from "./HttpException";

export class UnauthorizedException extends HttpException {
  constructor(message: string, resource: string, field?: string) {
    super({ status: 401, message, resource, field });
    this.name = "UnauthorizedException";
  }
}
