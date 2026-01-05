export class NotFoundError extends Error {
  public argument: number | string;
  public entity: string;

  constructor(entity: string, argument: string ) {
    super(`${entity} not found for this : ${argument}`);
    this.name = "NotFoundError";
    this.entity = entity;
    this.argument = argument;
  }
}