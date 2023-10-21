
const express = require("express")
const { auth } = require("../middleware/auth.middleware")
const { RecipeModel } = require("../model/fav_recipe_model")

 const RecipeRoutes = express()
  RecipeRoutes.use(auth)

 // Client create code 
 RecipeRoutes.post("/create", async(req,res)=> {
    const data = req.body
  try {
    const recipe = new RecipeModel(data)
    await recipe.save()
    res.status(200).json({msg:"added in fav recipe successfully!!!"})
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
 })




// Client get code
RecipeRoutes.get("/", async(req,res)=> {
    let UserId = req.body.UserId
    try {
        const client = await RecipeModel.find({ UserId: UserId })
        res.send(client)
    } catch (error) {
        console.log(error);
    }
 })

 // Recipe delete code
 RecipeRoutes.delete("/delete/:recipeId", async(req,res)=> {
    const userIdinUserDoc = req.body.UserId
    const { recipeId } = req.params
   console.log(recipeId);
    try {
        const recipe = await RecipeModel.findOne({ _id: recipeId })
        const userIDinrecipeDoc = recipe.UserId

        if (userIdinUserDoc === userIDinrecipeDoc) {
            console.log("user id in user Doc",userIdinUserDoc ,"user id in recipe doc", userIDinrecipeDoc);
           await RecipeModel.findByIdAndDelete({_id:recipeId}, req.body)
           res.json({msg:`Recipe has been deleted success`})
        } else {
            res.json({ msg: "you are not Authorized" })
        }
    } catch (error) {
        console.log(error);
    }
 })

 module.exports = {
    RecipeRoutes
 }