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
exports.movieController = void 0;
const movie_1 = require("../models/movie");
// import v1  from 'uuid';
exports.movieController = {
    getById: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const m = yield movie_1.movieModel.findById(req.params.movieId);
                if (m) {
                    res.json({ status: "success", message: "Movie found!!!", data: m });
                }
                else {
                    const error = new Error("Movie not found! Wrong IDs Movie!!");
                    res.status(404); // Set status code
                    next(error); // Pass the error to the error handling middleware
                }
            }
            catch (err) {
                // return res.status(404).json({ message: "Movie not found" });
                next(new Error("Movie not found!! IDs Movie Invalid!!"));
            }
        });
    },
    getAll: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movie_1.movieModel.find({});
                res.json({
                    status: "success",
                    message: "Movies list found!!!",
                    data: movies,
                });
            }
            catch (err) {
                return res.status(500).json({ message: "Movies list no found !!" });
            }
        });
    },
    updateById: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const m = yield movie_1.movieModel.findByIdAndUpdate(req.params.movieId, {
                    name: req.body.name,
                });
                if (m) {
                    res.json({
                        status: "success",
                        message: "Movie updated successfully!!!",
                        data: m,
                    });
                }
                else {
                    next(Error("Movie updated not success!!"));
                }
            }
            catch (err) {
                return res
                    .status(404)
                    .json({ status: "Movie updated not success!!!" });
            }
        });
    },
    deleteById: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movie_1.movieModel.deleteOne({ _id: req.params.movieId });
            try {
                res.json({
                    status: "success",
                    message: "Movie deleted successfully!!!",
                    data: null,
                });
            }
            catch (err) {
                return res
                    .status(500)
                    .json({ status: "Movie deleted not successfully!!!" });
            }
        });
    },
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const Id = "v1";
            const m = yield new movie_1.movieModel({
                movieId: Id,
                name: req.body.name,
                released_on: req.body.released_on,
            }).save();
            res.json({
                status: "success",
                message: "Movie added successfully!!!",
                data: m,
            });
        });
    },
};
//# sourceMappingURL=movie.controller.js.map