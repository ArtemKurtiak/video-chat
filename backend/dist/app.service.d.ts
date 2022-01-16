import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private messagingClient;
    constructor(messagingClient: ClientProxy);
    getHello(): string;
    createHello(): string;
}
