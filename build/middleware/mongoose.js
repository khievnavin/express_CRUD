"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMongooseId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validateMongooseId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Movie not Found!! Invalid ID",
        });
    }
    next();
};
exports.validateMongooseId = validateMongooseId;
//# sourceMappingURL=mongoose.js.map