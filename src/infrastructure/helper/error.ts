export class NotFoundError extends Error {
  public entity: string;
  public argument: string | number;

  constructor(entity: string, argument: string ) {
    super(`${entity} not found for this : ${argument}`);
    this.name = "NotFoundError";
    this.entity = entity;
    this.argument = argument;
  }
}