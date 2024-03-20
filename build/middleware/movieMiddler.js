"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("../models/movie");
const getIdMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const m = yield movie_1.movieModel.findById(req.params.movieId);
        if (m) {
            res.json({ status: "success", message: "Movie found!!!", data: m });
        }
        else {
            next(Error('Movie not found'));
        }
    }
    catch (err) {
        // return res.status(404).json({ message: "Movie not found" });
        next(new Error('Movie not found!!'));
    }
});
exports.default = getIdMiddleware;
//# sourceMappingURL=movieMiddler.js.map