import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCharacter, type CreateCharacterInput } from './application/use-cases/CreateCharacter';
import { ListRaces } from './application/use-cases/ListRaces';
import { ListClasses } from './application/use-cases/ListClasses';
import { ShowInitialWeapons } from '@/item/application/use-cases/ShowInitialWeapons';
import { AuthGuard } from '@/shared/infrastructure/auth/AuthGuard';
import { CurrentUser } from '@/shared/infrastructure/auth/CurrentUser.decorator';

@Controller('character')
@UseGuards(AuthGuard)
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
    async create(
        @Body() body: Omit<CreateCharacterInput, 'userId'>,
        @CurrentUser() user: { id: string, name: string, email: string }
    ) {
        return this.createCharacter.execute({
            ...body,
            userId: user.id.toString(),
        });
    }
}
