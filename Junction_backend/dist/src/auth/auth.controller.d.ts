import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): void;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    getProfile(req: any): Promise<any>;
}
