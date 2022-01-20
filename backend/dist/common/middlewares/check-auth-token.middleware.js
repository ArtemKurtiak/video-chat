"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAuthTokenMiddleware = void 0;
const CheckAuthTokenMiddleware = async (ctx, next) => {
    console.log(ctx);
    const value = await next();
    console.log(value);
};
exports.CheckAuthTokenMiddleware = CheckAuthTokenMiddleware;
//# sourceMappingURL=check-auth-token.middleware.js.map