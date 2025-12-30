export class ErrorResponse {
  constructor(
    public readonly message: string,
    public readonly error: string,
    public readonly statusCode: number,
  ) {}
}
