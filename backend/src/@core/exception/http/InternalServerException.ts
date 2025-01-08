import { HttpException } from "./HttpException";

export class InternalServerException extends HttpException {
  constructor(message: string, resource: string) {
    super({ status: 500, message, resource });
    this.name = "InternalServerException";
  }
}
