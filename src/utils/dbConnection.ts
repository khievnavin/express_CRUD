   import mongoose from "mongoose";

   const connectToDatabase = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/expressCRUD", {});
        console.log("Connected to MongoDB");
    }catch(err){
        console.log('Error connecting to MongoDB',err);
        process.exit(1);
    }
   };

   export default connectToDatabase;