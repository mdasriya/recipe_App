
const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../model/user.model")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")

UserRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body
  try {
    let reqData = await UserModel.find({ email });
    if (reqData.length > 0) {
      res.json({ msg: "You are already register" })
    } else {
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "password not hash" })
        } else {
          const user = new UserModel({ name, email, pass: hash })
          await user.save()
          res.status(200).json({ msg: "User has been created", userRegister: req.body })
        }
      })
    }
  } catch (error) {
console.log(error);
  }
})

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const reqdata = await UserModel.findOne({ email })
    if (reqdata) {
      bcrypt.compare(pass, reqdata.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ UserId: reqdata._id, user: reqdata.name }, "masai")
          res.status(200).json({ msg: "user Logged In Success!!!", token: token,UserId: reqdata._id, user: reqdata.name })
        } else {
          res.status(200).json({ msg: "Wrong credential" })
        }
      })
    } else {
      res.status(200).json({ msg: "register first" })
    }
  } catch (error) {
    console.log(err);
  }

})


module.exports = {
  UserRouter
}