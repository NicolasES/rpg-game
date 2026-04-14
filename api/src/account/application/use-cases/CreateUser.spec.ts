import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from './CreateUser';
import { User } from '@/account/domain/entities/User';

describe('CreateUser UseCase', () => {
    let useCase: CreateUser;
    let userRepository: jest.Mocked<any>;
    let hashProvider: jest.Mocked<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'UserRepository',
                    useValue: {
                        findByEmail: jest.fn().mockImplementation(async (email: string) => {
                            return Promise.resolve(null);
                        }),
                        create: jest.fn().mockImplementation(async (user: User) => {
                            (user as any).id = 'new-user-id';
                            return Promise.resolve(user);
                        }),
                    },
                },
                {
                    provide: 'HashProvider',
                    useValue: {
                        hash: jest.fn().mockImplementation(async (password: string) => {
                            return Promise.resolve(`hashed-${password}`);
                        }),
                        compare: jest.fn(),
                    },
                },
            ],
        }).compile();

        userRepository = module.get('UserRepository');
        hashProvider = module.get('HashProvider');
        useCase = new CreateUser(userRepository, hashProvider);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should create and return a new user', async () => {
        const input = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'secretpassword',
        };

        const result = await useCase.execute(input);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(hashProvider.hash).toHaveBeenCalledWith(input.password);
        expect(userRepository.create).toHaveBeenCalledTimes(1);

        const savedUser = userRepository.create.mock.calls[0][0];
        expect(savedUser.getName()).toBe(input.name);
        expect(savedUser.getEmail()).toBe(input.email);
        expect(savedUser.getPassword()).toBe(`hashed-${input.password}`);

        expect(result).toEqual({
            id: 'new-user-id',
            name: input.name,
            email: input.email,
        });
    });

    it('should throw an error if user with same email already exists', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(new User({
            id: 'existing-user-id',
            name: 'Existing User',
            email: 'johndoe@example.com',
            password: 'existing-hashed-password',
        }));

        const input = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'secretpassword',
        };

        await expect(useCase.execute(input)).rejects.toThrow('User already exists');
        expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
        expect(hashProvider.hash).not.toHaveBeenCalled();
        expect(userRepository.create).not.toHaveBeenCalled();
    });
});
