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
exports.CheckAuthTokenGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../auth/entities");
let CheckAuthTokenGuard = class CheckAuthTokenGuard {
    constructor(configService, authRepository) {
        this.configService = configService;
        this.authRepository = authRepository;
    }
    async canActivate(context) {
        try {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const { token } = ctx.getArgs();
            const authToken = await this.authRepository.findOne({
                where: {
                    token: token,
                },
                relations: ['user'],
            });
            if (!authToken) {
                return false;
            }
            await (0, jsonwebtoken_1.verify)(token, this.configService.get('JWT_SECRET'));
            ctx.getArgs().user = authToken.user;
            return true;
        }
        catch (e) {
            return true;
        }
    }
};
CheckAuthTokenGuard = __decorate([
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.Auth)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository])
], CheckAuthTokenGuard);
exports.CheckAuthTokenGuard = CheckAuthTokenGuard;
//# sourceMappingURL=check-auth-token.guard.js.map