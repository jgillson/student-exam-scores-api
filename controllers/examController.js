const Exam = require('../models/exam')
const EventSourceClient = require('../data/eventSourceClient')

module.exports = class ExamController {
    static findAll(req, res, next) {
        EventSourceClient.writeHead(res)

        Exam.findAll(exam => {
            EventSourceClient.writeData(res, exam)
        })
    }
    static findByNumber(req, res, next) {
        EventSourceClient.writeHead(res)

        Exam.findByNumber(req.params.number, exam => {
            EventSourceClient.writeData(res, exam)
        })
    }
}
