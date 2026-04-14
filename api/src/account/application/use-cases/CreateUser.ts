import { User } from "@/account/domain/entities/User";
import { UserAlreadyExistsError } from "@/account/domain/errors/UserAlreadyExistsError";
import type { UserRepository } from "@/account/domain/repositories/UserRepository";
import type { HashProvider } from "../providers/HashProvider";
import { Inject, Injectable } from "@nestjs/common";

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
}

export type CreateUserOutput = {
    id: string;
    name: string;
    email: string;
}

@Injectable()
export class CreateUser {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('HashProvider') private readonly hashProvider: HashProvider
    ) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const userExists = await this.userRepository.findByEmail(input.email);
        if (userExists) {
            throw new UserAlreadyExistsError(input.email);
        }
        const hashedPassword = await this.hashProvider.hash(input.password);
        const userProps = {
            ...input,
            password: hashedPassword
        }
        const user = new User(userProps);
        await this.userRepository.create(user);
        
        return {
            id: user.getId()!,
            name: user.getName(),
            email: user.getEmail(),
        };
    }
}