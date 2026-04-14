import { Test, TestingModule } from '@nestjs/testing';
import { SignIn } from './SignIn';
import { User } from '@/account/domain/entities/User';
import { InvalidCredentialsError } from '@/account/domain/errors/InvalidCredentialsError';

describe('SignIn UseCase', () => {
    let useCase: SignIn;
    let userRepository: jest.Mocked<any>;
    let hashProvider: jest.Mocked<any>;
    let jwtProvider: jest.Mocked<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'UserRepository',
                    useValue: {
                        findByEmail: jest.fn(),
                    },
                },
                {
                    provide: 'HashProvider',
                    useValue: {
                        compare: jest.fn(),
                    },
                },
                {
                    provide: 'JwtProvider',
                    useValue: {
                        sign: jest.fn().mockReturnValue('mocked-jwt-token'),
                    },
                },
            ],
        }).compile();

        userRepository = module.get('UserRepository');
        hashProvider = module.get('HashProvider');
        jwtProvider = module.get('JwtProvider');
        useCase = new SignIn(userRepository, hashProvider, jwtProvider);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should authenticate a user and return a token', async () => {
        const user = new User({
            id: 'valid-id',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'hashed-password',
        });
        userRepository.findByEmail.mockResolvedValueOnce(user);
        hashProvider.compare.mockResolvedValueOnce(true);

        const input = {
            email: 'johndoe@example.com',
            password: 'correctpassword',
        };

        const result = await useCase.execute(input);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(hashProvider.compare).toHaveBeenCalledWith(input.password, 'hashed-password');
        expect(jwtProvider.sign).toHaveBeenCalledWith({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
        });

        expect(result).toEqual({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            token: 'mocked-jwt-token',
        });
    });

    it('should throw an error if the user is not found', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(null);

        const input = {
            email: 'notfound@example.com',
            password: 'anypassword',
        };

        await expect(useCase.execute(input)).rejects.toThrow(InvalidCredentialsError);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(hashProvider.compare).not.toHaveBeenCalled();
        expect(jwtProvider.sign).not.toHaveBeenCalled();
    });

    it('should throw an error for an invalid password', async () => {
        const user = new User({
            id: 'valid-id',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'hashed-password',
        });
        userRepository.findByEmail.mockResolvedValueOnce(user);
        hashProvider.compare.mockResolvedValueOnce(false);

        const input = {
            email: 'johndoe@example.com',
            password: 'wrongpassword',
        };

        await expect(useCase.execute(input)).rejects.toThrow(InvalidCredentialsError);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(hashProvider.compare).toHaveBeenCalledWith(input.password, 'hashed-password');
        expect(jwtProvider.sign).not.toHaveBeenCalled();
    });
});
