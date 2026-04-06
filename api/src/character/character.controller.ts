import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCharacter, type CreateCharacterInput } from './application/use-cases/CreateCharacter';
import { ListRaces } from './application/use-cases/ListRaces';
import { ListClasses } from './application/use-cases/ListClasses';
import { ShowInitialWeapons } from '@/item/application/use-cases/ShowInitialWeapons';

@Controller('character')
export class CharacterController {
    constructor(
        private readonly createCharacter: CreateCharacter,
        private readonly listRaces: ListRaces,
        private readonly listClasses: ListClasses,
        private readonly showInitialWeapons: ShowInitialWeapons
    ) {}

    @Get('creation-data')
    async getCreationData() {
        const [races, classes, weapons] = await Promise.all([
            this.listRaces.execute(),
            this.listClasses.execute(),
            this.showInitialWeapons.execute()
        ]);

        return {
            races,
            classes,
            weapons
        };
    }

    @Post()
    async create(@Body() body: CreateCharacterInput) {
        return this.createCharacter.execute(body);
    }
}
