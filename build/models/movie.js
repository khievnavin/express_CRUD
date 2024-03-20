"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.default.Schema({
    movieId: {
        type: String,
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    released_on: {
        type: String,
        trim: true,
        required: true
    }
});
exports.movieModel = mongoose_1.default.model("Movie", MovieSchema);
//# sourceMappingURL=movie.js.map