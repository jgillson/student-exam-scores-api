const EventSourceClient = require('../data/eventSourceClient')

const exams = new Set()
const scores = new Set()
const students = new Set()

module.exports = class Exam {
    static setExams(sseScores, exams, callback) {
        for (let score of sseScores) {
            const currExam = JSON.parse(score)

            if (!exams.has(currExam.exam)) {
                exams.add(currExam.exam)
                callback(currExam.exam)
            }
        }
    }
    static findAll(callback) {
        EventSourceClient.fetchData(() => {
            this.setExams(EventSourceClient.sseData, exams, callback)
        })
    }
    static setExamScores(sseScores, examNumber, scores, students, callback) {
        for (let score of sseScores) {
            const currExam = JSON.parse(score)

            if (currExam.exam == examNumber && !students.has(currExam.studentId)) {
                const studentId = currExam.studentId
                students.add(studentId)

                const score = currExam.score
                scores.add(score)

                const totalScore = Array.from(scores)
                    .reduce((accumulator, examScore) =>
                        accumulator + examScore, 0)
                const averageScore = totalScore / scores.size

                callback({ averageScore, studentId, score })
            }
        }
    }
    static findByNumber(examNumber, callback) {
        EventSourceClient.fetchData(() => {
            this.setExamScores(EventSourceClient.sseData, examNumber, scores, students, callback)
        })
    }
}
