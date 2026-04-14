import { User } from './User';

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
});
