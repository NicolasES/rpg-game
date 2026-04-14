import { InvalidNameError } from '../errors/InvalidNameError';
import { InvalidEmailError } from '../errors/InvalidEmailError';

type UserProps = {
    id?: string;
    name: string;
    email: string;
    password?: string;
}

export class User {
    private id?: string;
    private name: string;
    private email: string;
    private password?: string;
    
    constructor(props: UserProps) {
        this.id = props.id;
        this.setName(props.name);
        this.setEmail(props.email);
        this.password = props.password;
    }
    
    public getId(): string | undefined {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getEmail(): string {
        return this.email;
    }
    
    public getPassword(): string | undefined {
        return this.password;
    }

    public setName(name: string): void {
        if (!name || name.trim().length < 3) {
            throw new InvalidNameError();
        }
        this.name = name;
    }

    public setEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new InvalidEmailError(email);
        }
        this.email = email;
    }
}
