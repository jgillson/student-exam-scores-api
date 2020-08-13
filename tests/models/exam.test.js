const chai = require('chai')

const Exam = require('../../models/exam')

describe('Exam', () => {
    describe('findAll', () => {
        it('should return truthy', () => {
            chai.expect(Exam.findAll).to.be.ok
        })
    })
    describe('setExams', () => {
        it('should return truthy', () => {
            chai.expect(Exam.setExams).to.be.ok
        })
        it('should set the returned exam numbers', () => {
            const subject = []
            const exams = new Set()
            const scoreData = [
                '{"studentId":"StudentA","exam":6215,"score":75}',
                '{"studentId":"StudentB","exam":6216,"score":80}',
                '{"studentId":"StudentC","exam":6557,"score":80}',
                '{"studentId":"StudentD","exam":6215,"score":65}',
                '{"studentId":"StudentE","exam":6557,"score":65}'
            ]
            
            Exam.setExams(scoreData, exams, exam => subject.push(exam))
            
            chai.expect(subject.length).to.eq(3)
            chai.expect(subject).to.eql([6215, 6216, 6557])
        })
    })
    describe('findByNumber', () => {
        it('should return truthy', () => {
            chai.expect(Exam.findByNumber).to.be.ok
        })
    })
    describe('setExamScores', () => {
        it('should set the returned exam scores', () => {
            const subject = []
            const scores = new Set()
            const students = new Set()
            const scoreData = [
                '{"studentId":"StudentA","exam":6215,"score":75}',
                '{"studentId":"StudentB","exam":6215,"score":80}',
                '{"studentId":"StudentC","exam":6216,"score":80}',
                '{"studentId":"StudentD","exam":6557,"score":65}'
            ]

            Exam.setExamScores(scoreData, 6215, scores, students, score => subject.push(score))

            chai.expect(subject).to.eql([
                { averageScore: 75, studentId: 'StudentA', score: 75 },
                { averageScore: 77.5, studentId: 'StudentB', score: 80 }
            ])
        })
    })
})
