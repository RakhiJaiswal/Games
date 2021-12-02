const express = require('express'); //requires express module
const socket = require('socket.io'); //requires socket.io module
const fs = require('fs');
const app = express();
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT); //tells to host server on localhost:3000


//Playing variables:
app.use(express.static('public')); //show static files in 'public' directory
console.log('Server is running');
const io = socket(server);

var count = 0;

const bingoArray = [
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 4, selected: false },
    { value: 5, selected: false },
    { value: 6, selected: false },
    { value: 7, selected: false },
    { value: 8, selected: false },
    { value: 9, selected: false },
    { value: 10, selected: false },
    { value: 11, selected: false },
    { value: 12, selected: false },
    { value: 13, selected: false },
    { value: 14, selected: false },
    { value: 15, selected: false },
    { value: 16, selected: false },
    { value: 17, selected: false },
    { value: 18, selected: false },
    { value: 19, selected: false },
    { value: 20, selected: false },
    { value: 21, selected: false },
    { value: 22, selected: false },
    { value: 23, selected: false },
    { value: 24, selected: false },
    { value: 25, selected: false },
]


let playerArray = []
let bingoPlayersArray = []
let currentRoomID;
let roomObj

//Socket.io Connection------------------
io.on('connection', (socket) => {
    playerArray.push(socket.id)
    socket.on('winner', (data) => {
        console.log("winner is ", socket.id)
        io.emit('winner', { winner: socket.id });

    })
    socket.on('createGame', (data) => {
        console.log("DATA from create Game", data)
        bingoPlayersArray.push(socket.id)
        roomObj = {
            gameName: data.gameName,
            host: socket.id,
            joinCode: data.joinCode,
            gameState: {
                status: "Joining"
            },
            users: [{ id: socket.id }],
            roomExist: true,
            winner: ''
        }
        io.emit("createGame", roomObj)
    })
    socket.on('checkCode', (data) => {
        console.log("Data", roomObj)
        if (data.code == roomObj.joinCode) {
            roomObj.users.push({ id: socket.id })
            io.emit('checkCode', roomObj)
        } else {
            io.emit('checkCode', { roomExist: false })
        }
    })
    socket.on('startGame', (data) => {
        roomObj.gameState.status = "Playing"
        console.log("Data", roomObj)
        io.emit('startGame', roomObj)
    })

    socket.on("endGame", (data) => {
        console.log("DataIn End Game", data)
        roomObj.winner = data
        roomObj.gameState.status = "GameOver"
        io.emit('endGame', roomObj)
    })



    socket.on('counter', (data) => {
        console.log("Data", data)
        bingoArray.map(item => {
            if (item.value === data.value) {
                console.log("I am here")
                item.selected = true
            }
        })
        value = data.value
        count++;
        console.log("Bingo Array", bingoArray)
        console.log(count)
        io.emit('counter', { count, value });
    })
})