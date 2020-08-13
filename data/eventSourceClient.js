const EventSource = require('eventsource')

module.exports = class EventSourceClient {
    static sseData = []
    static setData(event, callback) {
        callback(JSON.parse(event.data))
    }
    static fetchData(callback) {
        const sse = new EventSource('http://live-test-scores.herokuapp.com/scores')

        console.log(`Connecting - ${sse.url}`)

        sse.onopen = () => {
            console.log(`Connection Open - ${sse.url}`)
        }

        sse.addEventListener('score', event => {
            this.sseData.push(event.data)
            this.setData(event, callback)
        })

        sse.onerror = () => {
            console.log(`Connection Closed - ${sse.url}`)
            console.log('EventSource failed.')
        }
    }
    static writeHead(res) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        })
    }
    static writeData(res, data) {
        res.write(`data: ${JSON.stringify(data)}\n\n`)
    }
}
