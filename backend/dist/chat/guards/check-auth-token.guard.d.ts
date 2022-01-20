import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Auth } from '../../auth/entities';
export declare class CheckAuthTokenGuard implements CanActivate {
    private configService;
    private authRepository;
    constructor(configService: ConfigService, authRepository: Repository<Auth>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
