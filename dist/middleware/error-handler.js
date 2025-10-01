"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
async function errorHandler(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        const error = err;
        ctx.status = error.statusCode || 500;
        ctx.body = {
            error: error.name || 'InternalSeverError',
            message: error.message || 'An unexpected error occurred',
            ...(error.details ? { details: error.details } : {})
        };
        console.error(err);
    }
}
