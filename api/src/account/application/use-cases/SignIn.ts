import { UserRepository } from "@/account/domain/repositories/UserRepository";
import { HashProvider } from "../providers/HashProvider";
import { JwtProvider } from "../providers/JwtProvider";

type Input = {
    email: string;
    password: string;
}

type Output = {
    id: string;
    name: string;
    email: string;
    token: string;
}

export class SignIn {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashProvider: HashProvider,
        private readonly jwtProvider: JwtProvider
    ) {}
    
    async execute(input: Input): Promise<Output> {
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