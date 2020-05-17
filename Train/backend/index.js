const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");

// coors
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// app use

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));


server.listen(3030);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let user = {};

const chat = io.of('/all').on('connection', socket => {

    onUserConnect(socket);
    onMessage(socket);
    onPrivateMessage(socket);
    onUserDisconnect(socket);
    
});

const onUserConnect = (socket) => {
    socket.on("userConnect", data => {        
        let id = socket.id;
        let userName = data.userName;
        let newUser = {};
        newUser[id] = userName;
        user = { ...user, ...newUser };
        socket.broadcast.emit("notifyUserConnect", { notifyUserConnect: userName });
        getTotalUser(chat);
    });
}

const onMessage = (socket )=>{
    socket.on("message", data => {
        chat.emit("sendBackMessage", { content: data.content, from: data.from , fromId : socket.id });
    })
}

const onPrivateMessage = (socket )=>{
    socket.on("privateMessage", data => {
        chat.to(`${data.to}`).emit('sendBackPrivateMessage', {content: data.content, from: data.from, userName: data.userName, to: data.to});
    })
}

const onUserDisconnect = (socket) => {
    socket.on("disconnect", () => {
        chat.emit("notifyUserDisconnect", { notifyUserDisconnect: user[socket.id] });
        delete user[socket.id];
        getTotalUser(chat);
    });
}

const getTotalUser = (chat) => {
    chat.clients((error, clients) => {
        if (error) throw error;
        chat.emit("totalUser", { totalUser: clients.length ,  userList: user  });
    });
}

