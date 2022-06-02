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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../services/users.service");
const user_entity_1 = require("../models/entities/user.entity");
const create_user_input_1 = require("../models/dto/create-user.input");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const logged_dto_1 = require("../models/dto/logged.dto");
const auth_service_1 = require("../auth/auth.service");
const gql_login_1 = require("../types/gql.login");
let UsersResolver = class UsersResolver {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    createUser(createUserInput) {
        return this.userService.create(createUserInput);
    }
    async register(createUserInput) {
        const user = await this.userService.create(createUserInput);
        const payload = {
            email: user.email,
        };
        const token = this.authService.signPayload(payload);
        return { token };
    }
    async login(loginInput) {
        const user = await this.userService.findByLogin(loginInput);
        const payload = {
            email: user.email,
        };
        const token = this.authService.signPayload(payload);
        return { token };
    }
    findAll() {
        return this.userService.findAll();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => logged_dto_1.LoggedUserOutput),
    __param(0, (0, graphql_1.Args)('register')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => logged_dto_1.LoggedUserOutput),
    __param(0, (0, graphql_1.Args)('login')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gql_login_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findAll", null);
UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map