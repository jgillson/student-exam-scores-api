const EventSourceClient = require('../data/eventSourceClient')
const students = new Set()
const scores = new Set()

module.exports = class Student {
    static setStudents(sseScores, students, callback) {
        for (let score of sseScores) {
            const student = JSON.parse(score)

            if (!students.has(student.studentId)) {
                students.add(student.studentId)
                callback(student.studentId)
            }
        }
    }
    static findAll(callback) {
        EventSourceClient.fetchData(() => {
            this.setStudents(EventSourceClient.sseData, students, callback)
        })
    }
    static setStudentScores(sseScores, studentId, scores, callback) {
        for (let score of sseScores) {
            const student = JSON.parse(score)

            if (student.studentId === studentId && !scores.has(student.score)) {
                scores.add(student.score)
                const totalScore = Array.from(scores)
                    .reduce((accumulator, currentScore) =>
                        accumulator + currentScore, 0)
                const averageScore = totalScore / scores.size

                callback({ student, averageScore })
            }
        }
    }
    static findById(studentId, callback) {
        EventSourceClient.fetchData(() => {
            this.setStudentScores(EventSourceClient.sseData, studentId, scores, callback)
        })
    }
}
