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
exports.ChatResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const entities_1 = require("../auth/entities");
const guards_1 = require("./guards");
const args_1 = require("./dto/args");
const query_1 = require("./dto/query");
const message_1 = require("./dto/query/message");
let ChatResolver = class ChatResolver {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChats(args) {
        return this.chatService.getChats(args);
    }
    async getMessages(args) {
        return this.chatService.getMessagesByChat(args.chatId);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [query_1.ChatWithLastMessage]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [args_1.GetChatsArgs]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "getChats", null);
__decorate([
    (0, graphql_1.Query)(() => [message_1.MessageOT]),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [args_1.GetMessagesArgs]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "getMessages", null);
ChatResolver = __decorate([
    (0, graphql_1.Resolver)(() => entities_1.User),
    (0, common_1.UseGuards)(guards_1.CheckAuthTokenGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatResolver);
exports.ChatResolver = ChatResolver;
//# sourceMappingURL=chat.resolver.js.map