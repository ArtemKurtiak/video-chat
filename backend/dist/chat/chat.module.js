"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const chat_resolver_1 = require("./chat.resolver");
const chat_service_1 = require("./chat.service");
const entities_1 = require("./entities");
const entities_2 = require("../auth/entities");
const guards_1 = require("./guards");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        providers: [chat_resolver_1.ChatResolver, chat_service_1.ChatService, guards_1.CheckAuthTokenGuard],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Chat, entities_2.User, entities_2.Auth, entities_1.Message]),
            config_1.ConfigModule,
        ],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map