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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const entities_1 = require("./entities");
const entities_2 = require("./entities");
let AuthService = class AuthService {
    constructor(userRepository, authRepository, configService) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
        this.configService = configService;
    }
    async _generateToken(userId) {
        const token = (0, jsonwebtoken_1.sign)({}, this.configService.get('JWT_SECRET'), {
            expiresIn: this.configService.get('JWT_EXPIRE'),
        });
        const auth = this.authRepository.create({
            token,
            user: userId,
        });
        await this.authRepository.save(auth);
        return auth;
    }
    async _hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async _comparePasswords(password, hash) {
        const matched = await bcrypt.compare(password, hash);
        if (!matched) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    async registerUser(dto) {
        const { email } = dto;
        const userExists = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (userExists) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const hashedPassword = await this._hashPassword(dto.password);
        const user = await this.userRepository.create(Object.assign(Object.assign({}, dto), { password: hashedPassword }));
        const { id } = await this.userRepository.save(user);
        const auth = await this._generateToken(id);
        return Object.assign(Object.assign({}, auth), user);
    }
    async loginUser(args) {
        const { email, password } = args;
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
            select: ['password', 'id'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this._comparePasswords(password, user.password);
        const token = await this._generateToken(user.id);
        return Object.assign(Object.assign({}, token), user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map