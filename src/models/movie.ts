import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
    },
    // email:{
    //     type:String,
    //     trim:true,
    //     required:true
    // },
    // password:{
    //     type:String,
    //     trim:true,
    //     required:true
    // }

});

MovieSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Movie",MovieSchema);

