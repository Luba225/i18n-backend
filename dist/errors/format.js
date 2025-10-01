"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidationErrors = formatValidationErrors;
function formatValidationErrors(errors) {
    const result = {};
    const traverse = (err, parent = "") => {
        const property = parent ? `${parent}.${err.property}` : err.property;
        if (err.constraints) {
            result[property] = Object.values(err.constraints);
        }
        if (err.children?.length) {
            err.children.forEach(child => traverse(child, property));
        }
    };
    errors.forEach(e => traverse(e));
    return result;
}
