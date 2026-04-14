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
        this.name = props.name;
        this.email = props.email;
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
}
