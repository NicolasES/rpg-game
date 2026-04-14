import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from './application/use-cases/CreateUser';
import { SignIn } from './application/use-cases/SignIn';
import { CreateUserDto } from './presentation/dtos/CreateUser.dto';
import { SignInDto } from './presentation/dtos/SignIn.dto';

@Controller('account')
export class AccountController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly signIn: SignIn
    ) {}

    @Post('signup')
    async createAccount(@Body() body: CreateUserDto) {
        return this.createUser.execute(body);
    }

    @Post('signin')
    async authenticate(@Body() body: SignInDto) {
        return this.signIn.execute(body);
    }
}
