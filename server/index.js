const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000
const app = express();
const router = require('./Routes/router')
const server = http.createServer(app);
const io = socketio(server)
const cors = require('cors');
const { addUser, removeUser, getUser, getUserInRoom } = require('./users')
var socketid


app.use(router);
app.use(cors())
app.use(router, express.static('uploads'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({})
    }
    next();
});

require('./connection/mongodb.connection')();

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })//destructuting the data

        if (error) return callback(error)

        //helps to throw an event as a message to the user from backendto frontend
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })



        socket.join(user.room)//helps to join the room

        io.to(user.room).emit('userData', { room: user.room, users: getUserInRoom(user.room) })




        callback()
    })

    socket.on('userImage', (image) => {
        const user = getUser(socket.id);

        console.log(socket.id)
        console.log(user)

        // if (user) {
        //     console.log('image', image)

        if (user)
            io.sockets.emit('addimage', 'image recieved', { user: user.name, text: image });
        // }
    })


    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        // console.log('user', user)

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        }
    })



    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log('msg', socket.id)


        // console.log(socket.rooms, user)


        if (user) {
            console.log('user recieved')


            io.to(user.room).emit('message', { user: user.name, text: message });

        }
        callback();
    });
});



server.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))