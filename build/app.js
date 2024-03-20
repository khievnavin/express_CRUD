"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const student_route_1 = require("./routes/student.route");
const user_route_1 = require("./routes/user.route");
const path_1 = __importDefault(require("path"));
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
const movie_route_1 = require("./routes/movie.route");
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_1 = require("./utils/swagger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "30mb" }));
exports.app.use(body_parser_1.default.json());
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
exports.app.set('view engine', 'ejs');
exports.app.set("views", path_1.default.join(__dirname, 'views'));
exports.app.get('/', (req, res) => {
    res.send('Hello Oun Oun Tang Os Knea na Oun na!! Soksabay');
});
// app.get('/student', (req: Request, res: Response) => {
//     res.send('Hello Student Tang Os Knea!!');
// });
exports.app.use((req, res, next) => {
    res.on("finish", () => {
        const timeString = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        console.log('Response sent at:', timeString);
    });
    next();
});
exports.app.use('/student', student_route_1.studentRoute);
exports.app.use('/user', user_route_1.userRoute);
exports.app.use('/movie', movie_route_1.movieRouter);
// app.listen(port, () => {
//     console.log(`Sever is running on http://localhost:${port}`);
// });
(0, dbConnection_1.default)().then(() => {
    exports.app.listen(port, () => {
        console.log(`Sever is running on http://localhost:${port}`);
    });
});
// Global Error Handler
exports.app.use((err, req, res, _next) => {
    res.status(500).json({
        message: err.message,
    });
});
//# sourceMappingURL=app.js.map