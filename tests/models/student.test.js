const chai = require('chai')

const Student = require('../../models/student')

describe('Student', () => {
    describe('findAll', () => {
        it('should return truthy', () => {
            chai.expect(Student.findAll).to.be.ok
        })
    })
    describe('setStudents', () => {
        it('should return truthy', () => {
            chai.expect(Student.setStudents).to.be.ok
        })
        it('should set the returned student ids', () => {
            const subject = []
            const students = new Set()
            const studentData = [
                '{"studentId":"StudentA","exam":6215,"score":75}',
                '{"studentId":"StudentB","exam":6216,"score":80}',
                '{"studentId":"StudentC","exam":6557,"score":80}',
                '{"studentId":"StudentD","exam":6215,"score":65}',
                '{"studentId":"StudentA","exam":6557,"score":65}',
                '{"studentId":"StudentB","exam":6557,"score":65}'
            ]

            Student.setStudents(studentData, students, student => subject.push(student))

            chai.expect(subject.length).to.eq(4)
            chai.expect(subject).to.eql([
                "StudentA",
                "StudentB",
                "StudentC",
                "StudentD"
            ])
        })
    })
    describe('findById', () => {
        it('should return truthy', () => {
            chai.expect(Student.findById).to.be.ok
        })
    })
    describe('setStudentScores', () => {
        it('should set the returned student exam scores', () => {
            const subject = []
            const scores = new Set()
            const studentData = [
                '{"studentId":"StudentA","exam":6215,"score":85}',
                '{"studentId":"StudentB","exam":6216,"score":75}',
                '{"studentId":"StudentA","exam":6557,"score":65}'
            ]
            
            Student.setStudentScores(studentData, 'StudentA', scores, score => subject.push(score))
            
            chai.expect(subject).to.eql([
                { averageScore: 85, student: { exam: 6215, score: 85, studentId: "StudentA" } },
                { averageScore: 75, student: { exam: 6557, score: 65, studentId: "StudentA" } }
            ])
        })
    })
})
