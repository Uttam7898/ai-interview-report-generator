const mongoose = require("mongoose")

const blcklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[ true, "token is required to be added in blacklist" ]
    }
}, {
  timestamps: true
})

  const tokenBlacklistModel = mongoose.model("blacklisttoken", blcklistTokenSchema)

  module.exports = tokenBlacklistModel