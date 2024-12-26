import { Exception } from "../@shared/Exception";

export class ExternalServiceException extends Exception {
  public details: string;

  constructor(message: string, resource: string, details: string) {
    super({ message, resource, status: 500 });
    this.details = details;
    this.name = "ExternalServiceException";
  }
}
