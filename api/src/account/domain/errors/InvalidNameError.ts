import { DomainError } from '@/shared/domain/errors/DomainError';

export class InvalidNameError extends DomainError {
    constructor() {
        super('Name must have at least 3 characters');
        this.name = 'InvalidNameError';
    }
}
