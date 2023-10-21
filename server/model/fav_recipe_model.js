
const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
image:{type:String, required:true},
title:{type:String, required:true},
summary:{type:String, required:true},
instructions:{type:String, required:true},
user:{type:String, required:true},
UserId:{type:String, required:true}
},{
    versionKey:false
})

const RecipeModel = mongoose.model("recipe", recipeSchema)

module.exports = {
    RecipeModel
}