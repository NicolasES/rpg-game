import { DomainError } from '@/shared/domain/errors/DomainError';

export class InvalidCredentialsError extends DomainError {
    constructor() {
        super('Invalid email or password');
        this.name = 'InvalidCredentialsError';
    }
}
