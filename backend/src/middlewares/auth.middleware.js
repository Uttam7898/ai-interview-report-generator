const jwt=require("jsonwebtoken")
const tokenBlacklistModel = require('../models/blacklist.model')


async function authUser(req, res, next){
  const token = req.cookies.token
  
  if (!token) {
    return res.status(401).json({
      message:"no token provided"
    })
 } 
 const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})
 if (isTokenBlacklisted) {
  return res.status(401).json({
    message:"token is blacklisted, please login again"
  })
 }


try {
  const decodded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = decoded
  next()

 } catch(err) {
    return res.status(401).json({
      message:"invalid token"
    })
  }}
  module.exports = {authUser}