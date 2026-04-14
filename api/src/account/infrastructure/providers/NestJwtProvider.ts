import { Injectable } from "@nestjs/common";
import { JwtProvider } from "@/account/application/providers/JwtProvider";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class NestJwtProvider implements JwtProvider {
    constructor(
        private readonly jwtService: JwtService
    ) {}
    sign(payload: any): string {
        return this.jwtService.sign(payload);
    }
    verify(token: string): any {
        return this.jwtService.verify(token);
    }
}