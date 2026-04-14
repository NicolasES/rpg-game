import { Inject, Injectable } from "@nestjs/common";
import { InvalidCredentialsError } from "@/account/domain/errors/InvalidCredentialsError";
import type { UserRepository } from "@/account/domain/repositories/UserRepository";
import type { HashProvider } from "@/account/application/providers/HashProvider";
import type { JwtProvider } from "@/account/application/providers/JwtProvider";

export type SignInInput = {
    email: string;
    password: string;
}

export type SignInOutput = {
    id: string;
    name: string;
    email: string;
    token: string;
}

@Injectable()
export class SignIn {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('HashProvider') private readonly hashProvider: HashProvider,
        @Inject('JwtProvider') private readonly jwtProvider: JwtProvider
    ) {}
    
    async execute(input: SignInInput): Promise<SignInOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user || !user.getPassword()) {
            throw new InvalidCredentialsError();
        }
        const isPasswordValid = await this.hashProvider.compare(input.password, user.getPassword() as string);
        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }
        const token = this.jwtProvider.sign({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
        });
        return {
            id: user.getId()!,
            name: user.getName(),
            email: user.getEmail(),
            token,
        };
    }
}