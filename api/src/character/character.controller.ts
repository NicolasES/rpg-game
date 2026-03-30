import { Body, Controller, Post } from '@nestjs/common';
import { CreateCharacter, type CreateCharacterInput } from './application/use-cases/CreateCharacter';

@Controller('character')
export class CharacterController {
    constructor(
        private readonly createCharacter: CreateCharacter
    ) {}

    @Post()
    async create(@Body() body: CreateCharacterInput) {
        return this.createCharacter.execute(body);
    }
        
}
