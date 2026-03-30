const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController } = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

// POST - generate new report
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), generateInterviewReportController)

// GET - get all reports
interviewRouter.get("/", authMiddleware.authUser, getAllInterviewReportsController)

// GET - get report by ID
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, getInterviewReportByIdController)

module.exports = interviewRouter