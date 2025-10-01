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
exports.UserController = void 0;
const inversify_1 = require("inversify");
const user_service_1 = require("../services/user.service");
const types_1 = require("../types");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(ctx) {
        try {
            const users = await this.userService.findAll();
            ctx.body = users;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error fetching users" };
        }
    }
    async findOne(ctx) {
        try {
            const { id } = ctx.params;
            const user = await this.userService.findOne(id);
            if (!user) {
                ctx.status = 404;
                ctx.body = { message: "User not found" };
                return;
            }
            ctx.body = user;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error fetching user" };
        }
    }
    async create(ctx) {
        try {
            const data = ctx.request.body;
            const user = await this.userService.create(data);
            ctx.status = 201;
            ctx.body = user;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error creating user" };
        }
    }
    async update(ctx) {
        try {
            const { id } = ctx.params;
            const data = ctx.request.body;
            const updatedUser = await this.userService.update(id, data);
            ctx.body = updatedUser;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error updating user" };
        }
    }
    async delete(ctx) {
        try {
            const { id } = ctx.params;
            await this.userService.delete(id);
            ctx.status = 204;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error deleting user" };
        }
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
