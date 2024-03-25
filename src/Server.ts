import  app  from "./App";
import connectToDatabase from "./utils/dbConnection";


const port = 3000;

 const serve = connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Sever is running on http://localhost:${port}`);
    });
});

export default serve;