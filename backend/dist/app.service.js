"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let AppService = class AppService {
    constructor(notificationsClient, messagingClient) {
        this.notificationsClient = notificationsClient;
        this.messagingClient = messagingClient;
    }
    getHello() {
        return 'Hello World!';
    }
    createHello() {
        this.notificationsClient.emit('TEST', {});
        this.messagingClient.emit('HELLO_WORLD', {});
        return 'New hello world';
    }
    getNotifications() {
        return this.notificationsClient.send({ cmd: 'GET_NOTIFICATIONS' }, {});
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('NOTIFICATIONS')),
    __param(1, (0, common_1.Inject)('MESSAGING')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map