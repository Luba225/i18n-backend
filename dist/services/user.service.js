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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const inversify_1 = require("inversify");
const user_repository_1 = require("../repositories/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const types_1 = require("../types");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async comparePassword(user, password) {
        return bcryptjs_1.default.compare(password, user.password);
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async findOne(id) {
        return this.userRepository.findOne(id);
    }
    async create(data) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        return this.userRepository.create({ ...data, password: hashedPassword });
    }
    async update(id, data) {
        if (data.password) {
            data.password = await bcryptjs_1.default.hash(data.password, 10);
        }
        return this.userRepository.update(id, data);
    }
    async delete(id) {
        return this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
