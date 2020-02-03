const express = require('express')
const app = express()
const port = 3000
const getSocketConnection = require('./clientsocket')

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');

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
        res.render('index.ejs', {graph: data})
    })
})

app.get('/send-matrix', (req, res) => {
    const fakeMatrix = [
        [0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0]
    ]

    sock.client.write(JSON.stringify(fakeMatrix) + '\n')
    res.send('Posted!')
})

app.listen(port, () => console.log(`Web app listening on port ${port}`))
