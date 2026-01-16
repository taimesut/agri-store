import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
