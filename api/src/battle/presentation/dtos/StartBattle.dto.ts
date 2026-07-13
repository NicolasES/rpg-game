import { IsArray, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class StartBattleDto {
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value.map(String) : value)
    @IsString({ each: true })
    @ArrayMinSize(1, { message: 'You must select at least one hero for the battle.' })
    characterIds!: string[];

    @Transform(({ value }) => value ? String(value) : value)
    @IsString()
    @IsNotEmpty({ message: 'Hunting area level is required.' })
    huntingAreaLevelId!: string;
}
