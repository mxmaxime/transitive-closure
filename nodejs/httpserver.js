const express = require('express')
const app = express()
const port = 3000
const getSocketConnection = require('./clientsocket')

const sock = getSocketConnection('java')

async function onData() {
    return new Promise((resolve, reject) => {
        sock.client.on('data', data => {
            return resolve(data)
        })
    })
}

const r = onData()

app.get('/', (req, res) => {
    sock.client.write('hello world \n')
    r.then(data => {
        res.send(data)
    })
})

app.listen(port, () => console.log(`Web app listening on port ${port}`))
