import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private notificationsClient;
    private messagingClient;
    constructor(notificationsClient: ClientProxy, messagingClient: ClientProxy);
    getHello(): string;
    createHello(): string;
    getNotifications(): import("rxjs").Observable<any>;
}
