"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = validateParams;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const app_err_1 = require("../errors/app-err");
const format_1 = require("../errors/format");
function validateParams(DtoClass) {
    return async (ctx, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(DtoClass, ctx.params);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length) {
            throw new app_err_1.ValidationError('Invalid parameters', (0, format_1.formatValidationErrors)(errors));
        }
        await next();
    };
}
