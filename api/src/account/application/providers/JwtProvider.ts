export interface JwtProvider {
    sign(payload: any): string;
    verify(token: string): any;
}