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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../auth/entities");
const entities_2 = require("./entities");
let ChatService = class ChatService {
    constructor(userRepository, messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }
    async getChats(dto) {
        const user = await this.userRepository.findOne({
            where: {
                id: dto.user.id,
            },
            relations: ['chats'],
        });
        const chats = await Promise.all(user.chats.map(async (item) => {
            const lastMessage = await this.messageRepository.findOne({
                where: {
                    chat: item.id,
                },
                order: {
                    id: 'DESC',
                },
            });
            return Object.assign(Object.assign({}, item), { lastMessage });
        }));
        return chats;
    }
    async getMessagesByChat(chatId) {
        const messages = await this.messageRepository.find({
            where: {
                chat: chatId,
            },
        });
        return messages;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map