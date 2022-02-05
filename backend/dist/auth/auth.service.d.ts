import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities';
import { AuthType, UserType } from './types';
import { Auth } from './entities';
import { LoginArgs } from './dto/args';
import { RegisterInput } from './dto/input';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private userRepository;
    private authRepository;
    private sendGridClient;
    private configService;
    constructor(userRepository: Repository<User>, authRepository: Repository<Auth>, sendGridClient: ClientProxy, configService: ConfigService);
    private _generateToken;
    private _hashPassword;
    private _comparePasswords;
    registerUser(dto: RegisterInput): Promise<UserType & AuthType>;
    loginUser(args: LoginArgs): Promise<UserType & AuthType>;
}
