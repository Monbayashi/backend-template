import { Injectable } from '@nestjs/common';
import { ITransactionManager } from '../application/i-transaction-manager';
import { PrismaClientManagerService } from '../prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class PrismaTransactionManager implements ITransactionManager {
  constructor(private prismaService: PrismaClientManagerService) {}

  async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return await this.prismaService.$transaction(async (transaction) => {
      try {
        this.prismaService.setClient(transaction);
        const res = await callback();
        return res;
      } finally {
        this.prismaService.setClient(this.prismaService);
      }
    });
  }
}
