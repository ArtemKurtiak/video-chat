import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    handleTest(): void;
    getNotifications(): {
        message: string;
    };
}
