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
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const user_service_1 = require("../services/user.service");
const types_1 = require("../types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(ctx) {
        try {
            const { name, email, password } = ctx.request.body;
            if (!name || !email || !password) {
                ctx.status = 400;
                ctx.body = { message: "Fill all fields" };
                return;
            }
            const existingUser = await this.userService.findByEmail(email);
            if (existingUser) {
                ctx.status = 400;
                ctx.body = { message: "User already exists" };
                return;
            }
            const newUser = await this.userService.create({ name, email, password });
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret", {
                expiresIn: "7d",
            });
            ctx.status = 201;
            ctx.body = { token, user: newUser };
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Registration error" };
        }
    }
    async login(ctx) {
        try {
            const { email, password } = ctx.request.body;
            if (!email || !password) {
                ctx.status = 400;
                ctx.body = { message: "Fill all fields" };
                return;
            }
            const user = await this.userService.findByEmail(email);
            if (!user || !(await this.userService.comparePassword(user, password))) {
                ctx.status = 400;
                ctx.body = { message: "Invalid credentials" };
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
                expiresIn: "7d",
            });
            ctx.body = { token, user };
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Login error" };
        }
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
