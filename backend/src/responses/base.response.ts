export class BaseResponse<K extends string, T> {
  constructor(key: K, data: T) {
    return {
      [key]: data,
    } as BaseResponse<K, T>;
  }
}
