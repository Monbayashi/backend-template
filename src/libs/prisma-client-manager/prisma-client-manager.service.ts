// prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaClientManagerService
  extends PrismaClient
  implements OnModuleInit
{
  private client: PrismaClient | Prisma.TransactionClient = this;

  async onModuleInit() {
    await this.$connect();
  }

  setClient(client: PrismaClient | Prisma.TransactionClient): void {
    this.client = client;
  }

  getClient(): PrismaClient | Prisma.TransactionClient {
    return this.client;
  }
}
