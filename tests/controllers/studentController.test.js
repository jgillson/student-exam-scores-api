const chai = require('chai')
const sinon = require('sinon')

const StudentController = require('../../controllers/studentController')

describe('StudentController', () => {
    describe('findAll', () => {
        it('should return truthy', () => {
            chai.expect(StudentController.findAll).to.be.ok
        })
        it('should invoke findAll once', () => {
            let req = {}
            let res = {
                writeHead: sinon.spy()
            }
            StudentController.findAll(req, res)

            chai.expect(res.writeHead.calledOnce).to.be.true
        })
    })
    describe('findById', () => {
        it('should return truthy', () => {
            chai.expect(StudentController.findById).to.be.ok
        })
        it('should invoke findById once', () => {
            let req = {
                params: sinon.spy()
            }
            let res = {
                writeHead: sinon.spy()
            }
            StudentController.findById(req, res)

            chai.expect(res.writeHead.calledOnce).to.be.true
        })
    })
})
