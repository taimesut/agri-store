// export interface IJwtPayload {
//   sub: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   iat?: number;
//   exp?: number;
// }

export interface IServiceCrud<T, CreateDTO, UpdateDTO> {
  create(payload: CreateDTO): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  update(id: number, dto: UpdateDTO): Promise<T>;
  delete(id: number): Promise<T>;
}

export interface IControllerCrud<TId = number, TCreate = any, TUpdate = any> {
  findOne(id: TId): Promise<any>;

  findAll(): Promise<any>;

  create(payload: TCreate): Promise<any>;

  update(id: TId, payload: TUpdate): Promise<any>;

  delete(id: TId): Promise<any>;
}
