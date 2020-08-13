const chai = require('chai')
const sinon = require('sinon')

const EventSourceClient = require('../../data/eventSourceClient')

describe('EventSourceClient', () => {
    describe('fetchData', () => {
        it('should return truthy', () => {
            chai.expect(EventSourceClient.fetchData).to.be.ok
        })
    })
    describe('writeHead', () => {
        it('should invoke writeHead once', () => {
            let res = {
                writeHead: sinon.spy()
            }
            EventSourceClient.writeHead(res)

            chai.expect(res.writeHead.calledOnce).to.be.true
        })
    })
    describe('writeData', () => {
        it('should invoke writeData once with expected data', () => {
            let data = [
                '{"studentId":"StudentA","exam":6215,"score":75}'
            ]
            let res = {
                write: sinon.spy()
            }
            EventSourceClient.writeData(res, data)

            chai.expect(res.write.calledOnce).to.be.true
            console.log(res.write.firstCall.args[0])
            chai.expect(res.write.firstCall.args[0]).to.equal(
                'data: ["{\\"studentId\\":\\"StudentA\\",\\"exam\\":6215,\\"score\\":75}"]\n\n')
        })
    })
    describe('setData', () => {
        it('should have set the response data', () => {
            const data = JSON.stringify({
                studentId: 'StudentA', score: 85
            })
            const event = { data }
            EventSourceClient.setData(event, student => {
                chai.expect(student.studentId).to.equal('StudentA')
                chai.expect(student.score).to.equal(85)
            })
        })
    })
})
