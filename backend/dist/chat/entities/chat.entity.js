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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const entities_1 = require("../../auth/entities");
let Chat = class Chat {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Chat.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Chat.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.User, (user) => user.chats),
    (0, typeorm_1.JoinTable)({
        joinColumn: {
            referencedColumnName: 'id',
        },
        name: 'user_chat',
    }),
    __metadata("design:type", Array)
], Chat.prototype, "users", void 0);
Chat = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=chat.entity.js.map