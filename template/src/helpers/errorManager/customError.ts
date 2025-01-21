export class CustomError extends Error {
  constructor(
    public message: string,
    public code: number = 500,
    public errors: any = null
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
