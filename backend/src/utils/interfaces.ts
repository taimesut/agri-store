export interface IJwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}

export interface ICRUD<T, CreateDTO, UpdateDTO> {
  create(payload: CreateDTO): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  update(id: number, dto: UpdateDTO): Promise<T>;
  delete(id: number): Promise<T>;
}
