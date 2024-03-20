"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("../controllers/movie.controller");
const mongoose_1 = require("../middleware/mongoose");
exports.movieRouter = express_1.default.Router();
exports.movieRouter.get('/', movie_controller_1.movieController.getAll);
exports.movieRouter.post('/', movie_controller_1.movieController.create);
exports.movieRouter.get('/:movieId', mongoose_1.validateMongooseId, movie_controller_1.movieController.getById);
exports.movieRouter.put('/:movieId', mongoose_1.validateMongooseId, movie_controller_1.movieController.updateById);
exports.movieRouter.delete('/:movieId', movie_controller_1.movieController.deleteById);
//# sourceMappingURL=movie.route.js.map