"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler = ((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
    });
});
exports.default = errorhandler;
//# sourceMappingURL=errorHandler.js.map