const express = require('express')
const app = express()
const port = 3000
const initSocket = require('./socket')

(async() => {
    initSocket().then(com => {
        console.log({com})
    })

    com.sendMatrix('coucou les amis')

    // app.get('/', (req, res) => {
    //     res.send('Hello world')
    // })
    
    // app.listen(port, () => console.log(`Web app listening on port ${port}`))
})

