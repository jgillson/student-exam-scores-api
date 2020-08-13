const Student = require('../models/student')
const EventSourceClient = require('../data/eventSourceClient')

module.exports = class StudentController {
    static findAll(req, res, next) {
        EventSourceClient.writeHead(res)

        Student.findAll(student => {
            EventSourceClient.writeData(res, student)
        })
    }
    static findById(req, res, next) {
        EventSourceClient.writeHead(res)

        Student.findById(req.params.id, student => {
            EventSourceClient.writeData(res, student)
        })
    }
}
