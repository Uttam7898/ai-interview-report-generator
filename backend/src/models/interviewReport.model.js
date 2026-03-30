const mongoose = require('mongoose');


/* job description*
 resume text
 self description
 */   

const technicalQuestionSchema = new mongoose.Schema({
  question:{
    type:String,
    required:[true,"technical question is reqired"]
},

intention:{
  type:String,
  required:[true,"intention is required"]
},
answer:{
  type: String,
  required:[true,"answer is required"]
  }

},

{
  _id:false

})

const behavioralQuestionSchema = new mongoose.Schema({
  question:{
    type:String,
    required:[true,"technical question is reqired"]
},

intention:{
  type:String,
  required:[true,"intention is required"]
},
answer:{
  type: String,
  required:[true,"answer is required"]
  }

},

{
  _id:false

})

const skillGapsSchema = new mongoose.Schema({
  skill:{
    type: String,
    enum:["low","medium","high"],
    required:[true,"severity is required"]
  },
  },  
  
  {
    _id:false
})

const preparationPlanschema =new mongoose.Schema({
  day:{
    type:Number,
    required:[true,"day is required"]
  },
  focus:{
    type: String,
    required:[true,"focus is required"]
  },
  task:[{
    type: String,
    required:[true,"task is required"]
  }]

})


 const interviewReportSchema = new mongoose.Schema({
jobDescription: {
  type:String,
  required: [ true,"job description  is required"]
},
resume :{
  type: String,
},
selfDescription:{
  type: String,
},
matchScore:{
  type: Number,
  min : 0,
  max: 100,
},
technicalQuestios: [ technicalQuestionSchema ],
behavioralQuestion: [ behavioralQuestionSchema ],
SkillGaps: [skillGapsSchema],
preparationPlan: [preparationPlanschema],
user: {
  type:mongoose.Schema.Types.ObjectId,
  ref:"users"

}
 },
  {
  timestamps:true

})
const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel;
