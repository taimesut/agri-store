// export interface IJwtPayload {
//   sub: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   iat?: number;
//   exp?: number;
// }

export interface IServiceCrud<T, CreateTDTO, UpdateTDTO> {
  create(payload: CreateTDTO): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  update(id: string, payload: UpdateTDTO): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface IControllerCrud<TCreate = any, TUpdate = any> {
  findOne(id: string): Promise<any>;

  findAll(): Promise<any>;

  create(payload: TCreate): Promise<any>;

  update(id: string, payload: TUpdate): Promise<any>;

  delete(id: string): Promise<any>;
}
