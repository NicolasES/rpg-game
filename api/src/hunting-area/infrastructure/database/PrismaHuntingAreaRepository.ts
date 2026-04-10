import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/shared/infrastructure/database/PrismaService";
import { HuntingAreaRepository } from "@/hunting-area/domain/repositories/HuntingAreaRepository";
import { HuntingArea } from "@/hunting-area/domain/entities/HuntingArea";
import { HuntingAreaLevel } from "@/hunting-area/domain/entities/HuntingAreaLevel";
import { Monster } from "@/monster/domain/entities/Monster";
import { Attribute } from "@/shared/domain/enums/AttributesEnum";

@Injectable()
export class PrismaHuntingAreaRepository implements HuntingAreaRepository {
    constructor(private readonly prisma: PrismaService) {}

    // Repository methods for data mutation (save, update, delete) go here.
}
