import { IsArray, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class StartBattleDto {
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value.map(String) : value)
    @IsString({ each: true })
    @ArrayMinSize(1, { message: 'Você precisa selecionar pelo menos um herói para a batalha.' })
    characterIds!: string[];

    @Transform(({ value }) => value ? String(value) : value)
    @IsString()
    @IsNotEmpty({ message: 'O nível da área de caça é obrigatório.' })
    huntingAreaLevelId!: string;
}
