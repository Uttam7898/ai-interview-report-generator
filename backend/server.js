require("dotenv").config();
const cors = require("cors")
const app = require("./src/app");
const connectToDatabase = require("./src/config/database");
//const {invokeGeminiAi} = require("./src/services/ai.services")


connectToDatabase();
// invokeGeminiAi()





app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
   
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))