import express, {Application, Request, Response , NextFunction} from 'express'
import { studentRoute } from './routes/student.route';
import { userRoute } from './routes/user.route';
import path from 'path';
import connectToDatabase from './utils/dbConnection';
import { movieRouter } from './routes/movie.route';
import bodyParser from 'body-parser';
import { swaggerDocument } from './utils/swagger';
import swaggerUi from 'swagger-ui-express'


export const app: Application = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true , limit: "30mb"}));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,'views'))


app.get('/', (req: Request, res: Response) => {
    res.send('Hello Oun Oun Tang Os Knea na Oun na!! Soksabay');
});
// app.get('/student', (req: Request, res: Response) => {
//     res.send('Hello Student Tang Os Knea!!');
// });

app.use((req, res, next) => {
    res.on("finish", () => {
      const timeString = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      console.log('Response sent at:', timeString);
    });
    next();
  });

app.use('/student', studentRoute);
app.use('/user', userRoute);
app.use('/movie', movieRouter);


// app.listen(port, () => {
//     console.log(`Sever is running on http://localhost:${port}`);
// });
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Sever is running on http://localhost:${port}`);
    });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
      message: err.message,
    });
  }); 