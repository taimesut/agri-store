import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { hashPassword } from 'src/common/utils/password.util';
import { PaginationQueryDTO } from 'src/common/dtos/pagination-query.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async throwUserNotFound(id: string) {
    const hasId = await this.userRepo.hasId(id);

    if (!hasId) {
      throw new NotFoundException({
        code: 'NOT_FOUND_USER',
        message: `User not found with id: ${id}`,
      });
    }
  }

  async throwEmailExists(email: string) {
    const hasEmail = await this.userRepo.hasEmail(email);

    if (hasEmail) {
      throw new ConflictException({
        code: 'EMAIL_IS_EXISTING',
        message: 'Email already exists',
      });
    }
  }

  async create(payload: CreateUserDTO) {
    const { email, fullName, password } = payload;
    await this.throwEmailExists(email);

    const hashedPassword = await hashPassword(password);

    return await this.userRepo.create({
      password: hashedPassword,
      email,
      fullName,
    });
  }

  async findOne(id: string) {
    return await this.userRepo.findById(id);
  }
  async findAll(query: PaginationQueryDTO) {
    return await this.userRepo.findAll(query);
  }
  async update(id: string, payload: UpdateUserDTO) {
    await this.throwUserNotFound(id);
    if (payload.password) {
      payload.password = await hashPassword(payload.password);
    }
    if (payload.email) {
      delete payload.email;
    }
    return await this.userRepo.updateById(id, payload);
  }

  async delete(id: string) {
    await this.throwUserNotFound(id);

    await this.userRepo.deleteById(id);
    return { message: 'Deleted' };
  }
}
