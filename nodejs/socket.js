const net = require('net');

const HOST = 'localhost'; // parameterize the IP of the Listen
const PORT = 6969; // TCP LISTEN port

function initSocket() {
    return new Promise((resolve, reject) => {
        net.createServer(sock => {
            // Receives a connection - a socket object is associated to the connection automatically
            console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort)
            return resolve(communication(sock))
        }).listen(PORT, HOST)
        console.log('Server listening on ' + HOST +':'+ PORT);
    })
}

async function communication(socket) {

    function sendMatrix(json) {
        console.log(`write ${json}`)
        socket.write(json)
    }

    return {
        sendMatrix
    }
}

module.exports = initSocket

// Create an instance of the Server and waits for a connexion
// net.createServer(sock => {

//   // Add a 'data' - "event handler" in this socket instance
//   sock.on('data', data => {
// 	  // data was received in the socket 
// 	  // Writes the received message back to the socket (echo)
// 	  sock.write(data);
//   });

//   // Add a 'close' - "event handler" in this socket instance
//   sock.on('close', data => {
// 	  // closed connection
// 	  console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
//   });

// }).listen(PORT, HOST);
