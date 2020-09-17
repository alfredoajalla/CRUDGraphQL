const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Category'
    },
    ingredients:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Ingredient'
        }

    ],
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    },
}, {
    timestamps:true
});
module.exports = mongoose.model ('Recipe', recipeSchema);