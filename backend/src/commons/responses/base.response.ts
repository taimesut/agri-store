export class BaseResponse<T = any> {
  constructor(
    public readonly data: T | null = null,
    public readonly message: string = 'Success',
    public readonly statusCode: number = 200,
  ) {}
}
