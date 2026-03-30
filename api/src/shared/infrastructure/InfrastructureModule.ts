import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class InfrastructureModule {}
