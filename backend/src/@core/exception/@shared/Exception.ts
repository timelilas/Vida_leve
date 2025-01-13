export interface ExceptionParams {
  message: string;
  status: number;
  resource: string;
  path?: string;
}

export abstract class Exception extends Error {
  public timestamp: Date;
  public status: number;
  public resource: string;
  public path?: string;

  constructor({ message, path, resource, status }: ExceptionParams) {
    super(message);
    this.name = "Exception";
    this.path = path;
    this.status = status;
    this.resource = resource;
    this.timestamp = new Date();
  }
}
