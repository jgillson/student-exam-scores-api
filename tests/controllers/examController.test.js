const chai = require('chai')
const sinon = require('sinon')

const ExamController = require('../../controllers/examController')

describe('ExamController', () => {
    describe('findAll', () => {
        it('should return truthy', () => {
            chai.expect(ExamController.findAll).to.be.ok
        })
        it('should invoke findAll once', () => {
            let req = {}
            let res = {
                writeHead: sinon.spy()
            }
            ExamController.findAll(req, res)

            chai.expect(res.writeHead.calledOnce).to.be.true
        })
    })
    describe('findByNumber', () => {
        it('should return truthy', () => {
            chai.expect(ExamController.findByNumber).to.be.ok
        })
        it('should invoke findByNumber once', () => {
            let req = {
                params: sinon.spy()
            }
            let res = {
                writeHead: sinon.spy()
            }
            ExamController.findByNumber(req, res)

            chai.expect(res.writeHead.calledOnce).to.be.true
        })
    })
})
