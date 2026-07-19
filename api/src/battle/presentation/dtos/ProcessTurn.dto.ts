import { IsString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class TurnActionDto {
    @IsString()
    heroId: string;

    @IsString()
    targetMonsterId: string;
}

export class ProcessTurnDto {
    @IsString()
    battleId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TurnActionDto)
    @ArrayMinSize(1)
    actions: TurnActionDto[];
}
