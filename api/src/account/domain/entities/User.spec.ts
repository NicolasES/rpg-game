import { User } from './User';
import { InvalidNameError } from '../errors/InvalidNameError';
import { InvalidEmailError } from '../errors/InvalidEmailError';

describe('User', () => {
    it('should correctly configure a new instance of User', () => {
        const userProps = {
            id: 'valid-id',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'hashed-password',
        };

        const user = new User(userProps);

        expect(user).toBeDefined();
        expect(user.getId()).toBe(userProps.id);
        expect(user.getName()).toBe(userProps.name);
        expect(user.getEmail()).toBe(userProps.email);
        expect(user.getPassword()).toBe(userProps.password);
    });

    it('should correctly configure an instance without id', () => {
        const userProps = {
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            password: 'hashed-password',
        };

        const user = new User(userProps);

        expect(user).toBeDefined();
        expect(user.getId()).toBeUndefined();
        expect(user.getName()).toBe(userProps.name);
        expect(user.getEmail()).toBe(userProps.email);
        expect(user.getPassword()).toBe(userProps.password);
    });

    it('should throw InvalidNameError for a name with less than 3 characters', () => {
        const userProps = {
            name: 'Jo',
            email: 'johndoe@example.com',
            password: 'hashed-password',
        };

        expect(() => new User(userProps)).toThrow(InvalidNameError);
    });

    it('should throw InvalidNameError for an empty name or whitespace', () => {
        expect(() => new User({ name: '', email: 'johndoe@example.com' })).toThrow(InvalidNameError);
        expect(() => new User({ name: '   ', email: 'johndoe@example.com' })).toThrow(InvalidNameError);
    });

    it('should throw InvalidEmailError for an invalid email format', () => {
        const userProps = {
            name: 'John Doe',
            email: 'invalid-email',
            password: 'hashed-password',
        };

        expect(() => new User(userProps)).toThrow(InvalidEmailError);
    });

    it('should throw InvalidEmailError for an empty email', () => {
        expect(() => new User({ name: 'John Doe', email: '' })).toThrow(InvalidEmailError);
    });
});
