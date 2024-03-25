import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    movieId:{
        type:String,
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    released_on:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports = mongoose.model("Movie",MovieSchema);

