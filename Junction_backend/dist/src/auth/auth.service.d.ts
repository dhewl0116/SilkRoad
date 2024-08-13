import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJwt(user: any): Promise<string>;
    validateGoogleUser(profile: any): Promise<any>;
}
