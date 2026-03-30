const pdfparse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res) {
    const resumeContent = await (new pdfparse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated succesfuly",
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id })
    res.status(200).json({ interviewReports })
}

async function getInterviewReportByIdController(req, res) {
    const interviewReport = await interviewReportModel.findById(req.params.interviewId)
    res.status(200).json({ interviewReport })
}

module.exports = { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportByIdController }