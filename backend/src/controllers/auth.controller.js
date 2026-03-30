const usermodel = require('../models/user-model')
// Controller file loaded (consider using a proper logger in production)
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require('../models/blacklist.model')
const { get } = require('mongoose')


async function registerUserController(req, res){
  
  const { username, email, password } = req.body
  console.log("Register attempt:", { username, email, password })
 
  if (!username || !email || !password) {

    return res.status(400).json({message:"all fields are required"

    })
  }
 
   const isUserExist = await usermodel.findOne({
   $or: [{username},  {email}]
   })  
  
   if (isUserExist) {
    return res.status(400).json({message:"user already exists"})
  }

  const hashedPassword = await bcrypt.hash(password, 10)
 
  const user = await usermodel.create({
    username,
    email,
    password: hashedPassword
  })

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  )

  // Optional: set auth cookie (adjust options in production as needed)
  res.cookie("token", token)
  
  res.status(201).json({
    message: "user registered successfully",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    }
  })
}

async function loginUserController(req, res){
  const { email, password } = req.body
  console.log("login attempt:",{email,password})
  const user = await usermodel.findOne({email})
  if (!user) {
    return res.status(400).json({message:"invalid credentials"})
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({message:"invalid credentials"})
  }

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  )
  res.cookie("token", token,{
    httpOnly:true,
    samesite:"lax"
  })

  res.status(200).json({
    message:"user logged in successfully",
    token,
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })

}
async function logoutUserController(req, res){
 const token = req.cookies.token
 if (token) {
 await tokenBlacklistModel.create({token})
 }
  res.clearCookie("token")
  res.status(200).json({
    message:"user logged out successfully"
  })
  
}
async function getMeController(req, res){
 const token = req.cookies.token
 if (!token) {
  return res.status(401).json({message:"no token provided"})
 }
 const decoded = jwt.verify(token, process.env.JWT_SECRET)
 const user = await usermodel.findById(decoded.id)
 if (!user) {
  return res.status(404).json({message:"user not found"})
 }
 res.status(200).json({
  message:"user found",
  user:{
    id: user._id,
    username: user.username,
    email: user.email
  }
 })
}


module.exports = {registerUserController, loginUserController
, logoutUserController,getMeController
};
