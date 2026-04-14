import { Inject } from "@nestjs/common";
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

export class SignIn {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('HashProvider') private readonly hashProvider: HashProvider,
        @Inject('JwtProvider') private readonly jwtProvider: JwtProvider
    ) {}
    
    async execute(input: SignInInput): Promise<SignInOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await this.hashProvider.compare(input.password, user.getPassword());
        if (!isPasswordValid) {
            throw new Error('Invalid password');
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