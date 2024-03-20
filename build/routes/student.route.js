"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoute = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
exports.studentRoute = express_1.default.Router();
exports.studentRoute.get('/', student_controller_1.index);
exports.studentRoute.get('/ejs', student_controller_1.ejs);
//# sourceMappingURL=student.route.js.map