import { User } from "@/account/domain/entities/User";
import { UserRepository } from "@/account/domain/repositories/UserRepository";
import { HashProvider } from "../providers/HashProvider";

type Input = {
    name: string;
    email: string;
    password: string;
}

type Output = {
    id: string;
    name: string;
    email: string;
}

export class CreateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashProvider: HashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
        const userExists = await this.userRepository.findByEmail(input.email);
        if (userExists) {
            throw new Error('User already exists');
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