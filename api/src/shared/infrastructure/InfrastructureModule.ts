import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database/PrismaService';
import { RedisService } from './database/RedisService';

@Global()
@Module({
    providers: [PrismaService, RedisService],
    exports: [PrismaService, RedisService],
})
export class InfrastructureModule {}
