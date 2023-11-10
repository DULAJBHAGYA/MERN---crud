const mongoose= require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Posts',postSchema);