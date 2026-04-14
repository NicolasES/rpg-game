import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser, type CreateUserInput } from './application/use-cases/CreateUser';
import { SignIn, type SignInInput } from './application/use-cases/SignIn';

@Controller('account')
export class AccountController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly signIn: SignIn
    ) {}

    @Post('signup')
    async createAccount(@Body() body: CreateUserInput) {
        return this.createUser.execute(body);
    }

    @Post('signin')
    async authenticate(@Body() body: SignInInput) {
        return this.signIn.execute(body);
    }
}
