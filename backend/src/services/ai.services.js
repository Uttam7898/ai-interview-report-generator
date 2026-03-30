const { Behavior } = require("@google/genai");
const Groq = require("groq-sdk");
const {z}=require("zod")
const{zodtojsonschema} =require("zod-to-json-schema");
const { response } = require("../app");

const groq = new Groq({
  apiKey: process.env.GOOGLE_GEN_API_KEY
});

async function genrateInterviewReport({resume,selfDescription,jobDescription}) {
  
}
const InterviewReportSchema = z.object({
  matchscore:z.number().describe("a score between 0 and 100 indicating how well the candidate,s profile"),
  technicalQuestions:z.array(z.object({
  question:z.string().describe("the technical question can be ask in the interiew"),
  intention:z.string().describe("the intetion of interviewer behind asking this question"),
  answer:z.string().describe("how to asnser this question,what points to cover, what approach to take etc.")
 })).describe("the technical question can be ask in the interiew"),

  behavioralQuestions: z.array(z.object({

   question:z.string().describe("the technical question can be ask in the interiew"),
  intention:z.string().describe("the intetion of interviewer behind asking this question"),
  answer:z.string().describe("how to asnser this question,what points to cover, what approach to take etc.")

 })).describe("the technical question can be ask in the interiew along with their intetion"),
 skillGaps: z.array(z.object({
  skill:z.string().describe("the skill which the candidate is lacking"),
  severity:z.enum(["low","medium","high"]).describe("the severity of")

 })).describe("list of all gaps in the candidate's profile along with their severity"),
preparationPlan:z.array(z.object({
  day: z.number().describe("the day number in the preparation plan,starting from 1"),
  focus :z.string().describe("the main focus of this day in the  preapration,e.g.data"),
  tasks:z.array(z.string()).describe("list of the task to be done on this day to follow the prep."),

})).describe("a day-wise preaption plan for the candidate to follow in order")
})

async function generateInterviewReport({ resume, selfDescription,jobDescription}){

 const prompt = `Generate an interview report for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Respond ONLY in valid JSON with exactly these fields:
{
  "candidateName": "",
  "matchScore": 0,
  "technicalQuestions": [{"question": "", "intention": "", "answer": ""}],
  "behavioralQuestions": [{"question": "", "intention": "", "answer": ""}],
  "skillGaps": [{"skill": "", "severity": ""}],
  "areasForImprovement": [],
  "preparationPlan": []
}`;
  const response =await groq.chat.completions.create({
    model:"llama-3.3-70b-versatile",
    messages: [
    { role: "system", content: "Respond only in valid JSON." },
    { role: "user", content: prompt }
  ],
  response_format: { type: "json_object" }

  });
  const result = JSON.parse(response.choices[0].message.content);
 console.log(JSON.stringify(result,null,2));
  return result;

}

async function invokeGeminiAi() {
  const result = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: "Hello! Explain what is Interview?" }]
  });

  console.log(result.choices[0].message.content);
}  
  


module.exports = {generateInterviewReport,invokeGeminiAi};