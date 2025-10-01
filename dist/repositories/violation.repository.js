"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolationRepository = void 0;
const inversify_1 = require("inversify");
const violation_schema_1 = __importDefault(require("../models/violation.schema"));
let ViolationRepository = class ViolationRepository {
    async findAll() {
        return violation_schema_1.default.find();
    }
    async findOne(id) {
        return violation_schema_1.default.findById(id);
    }
    async create(data) {
        return violation_schema_1.default.create(data);
    }
    async update(id, data) {
        return violation_schema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return violation_schema_1.default.findByIdAndDelete(id);
    }
};
exports.ViolationRepository = ViolationRepository;
exports.ViolationRepository = ViolationRepository = __decorate([
    (0, inversify_1.injectable)()
], ViolationRepository);
