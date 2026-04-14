import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountController } from './account.controller';
import { CreateUser } from './application/use-cases/CreateUser';
import { SignIn } from './application/use-cases/SignIn';
import { PrismaUserRepository } from './infrastructure/repositories/PrismaUserRepository';
import { BcryptHashProvider } from './infrastructure/providers/BcryptHashProvider';
import { NestJwtProvider } from './infrastructure/providers/NestJwtProvider';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AccountController], 
  providers: [  
    CreateUser,
    SignIn,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository
    },
    {
      provide: 'HashProvider',
      useClass: BcryptHashProvider
    },
    {
      provide: 'JwtProvider',
      useClass: NestJwtProvider
    },
  ]
})
export class AccountModule {}
