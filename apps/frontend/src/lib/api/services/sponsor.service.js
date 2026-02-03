"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorService = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    message;
    code;
    details;
    constructor(statusCode, message, code, details) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
        this.details = details;
        this.name = "AppError";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
exports.sponsorService = {
    async getSponsors() {
        return apiFetch("/sponsors");
    },
    async getActiveChallenges() {
        return apiFetch("/sponsors/challenges/active");
    },
    async getSponsorById(id) {
        return apiFetch(`/sponsors/${id}`);
    },
};
