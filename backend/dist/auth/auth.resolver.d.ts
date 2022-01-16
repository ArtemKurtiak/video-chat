import { AuthType, UserType } from './types';
import { AuthService } from './auth.service';
import { LoginArgs } from './dto/args';
import { RegisterInput } from './dto/input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterInput): Promise<UserType & AuthType>;
    login(args: LoginArgs): Promise<AuthType & UserType>;
}
