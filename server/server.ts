
import * as express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import {readProbe} from './sensor'

const app = express();
let httpServer = http.createServer(app);
const io = new Server(httpServer);
let PORT = 3000;

//Generate unique client Id´s

// const generateId = () => {
//     const id = () => Math.floor(Math.random() * 0x10000).toString(16).substring(1);
//     return id() + id() + '-' + id();
// }


// Static files
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/public'));

app.get('./', (req, res) => {
    res.send('Hello World!')
    res.send(__dirname);
});

//Socket setup
io.on('request', (socket) => {
    console.log('made new connection' + socket);
})

io.emit('probeData', () => {
    const data = readProbe();
    return {temp: data.temp, hum: data.hum}
} )

app.listen(PORT);