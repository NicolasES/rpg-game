import { DomainError } from '@/shared/domain/errors/DomainError';

export class InvalidEmailError extends DomainError {
    constructor(email: string) {
        super(`Email ${email} is not valid`);
        this.name = 'InvalidEmailError';
    }
}
