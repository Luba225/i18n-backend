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
exports.ViolationController = void 0;
const inversify_1 = require("inversify");
const violation_service_1 = require("../services/violation.service");
const types_1 = require("../types");
let ViolationController = class ViolationController {
    constructor(violationService) {
        this.violationService = violationService;
    }
    async findAll(ctx) {
        try {
            const violations = await this.violationService.findAll();
            ctx.body = violations;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error fetching violations" };
        }
    }
    async findOne(ctx) {
        try {
            const { id } = ctx.params;
            const violation = await this.violationService.findOne(id);
            if (!violation) {
                ctx.status = 404;
                ctx.body = { message: "Violation not found" };
                return;
            }
            ctx.body = violation;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error fetching violation" };
        }
    }
    async create(ctx) {
        try {
            const data = ctx.request.body;
            const violation = await this.violationService.create(data);
            ctx.status = 201;
            ctx.body = violation;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error creating violation" };
        }
    }
    async update(ctx) {
        try {
            const { id } = ctx.params;
            const data = ctx.request.body;
            const updatedViolation = await this.violationService.update(id, data);
            ctx.body = updatedViolation;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error updating violation" };
        }
    }
    async delete(ctx) {
        try {
            const { id } = ctx.params;
            await this.violationService.delete(id);
            ctx.status = 204;
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { message: err.message || "Error deleting violation" };
        }
    }
};
exports.ViolationController = ViolationController;
exports.ViolationController = ViolationController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ViolationService)),
    __metadata("design:paramtypes", [violation_service_1.ViolationService])
], ViolationController);
