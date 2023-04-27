const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const port = 9000;

let connectedUsers = [];
let channels = {
  'General': [],
  'Graphisme': [],
  'Developpement': []
}

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} est connecté`);

  socket.on('newUser', (username) => {
    // J'ajoute un nouvel utilisateur à la liste des users connecté
    connectedUsers.push({ name: username, channel: "General" });
    io.emit('updateUserList', connectedUsers.filter((user) => user.channel === "General").map((user) => user.name));
  });

  socket.on('updateUsername', ({ oldUsername, newUsername }) => {
    const index = connectedUsers.findIndex((user) => user.name === oldUsername);
    if (index !== -1) {
      connectedUsers.splice(index, 1, { name: newUsername, channel: "General" });
      io.emit('updateUserList', connectedUsers.filter((user) => user.channel === "General").map((user) => user.name));
    }
  });

  socket.on('sendMessage', ({ username, message }) => {
    // Envoie d'un message aux users connectés
    io.emit('newMessage', { username, message });
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} is disconnected`);
    const index = connectedUsers.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      connectedUsers.splice(index, 1);
      io.emit('updateUserList', connectedUsers.filter((user) => user.channel === "General").map((user) => user.name));
    }
  });

  socket.on('notifyTyping', () => {
    socket.broadcast.emit('typingNotification', socket.username);
  });

  socket.on('changeChannel', (channel) => {
    // Je retire l'utilisateur du canal précédent
    const previousChannel = Object.keys(channels).find(key => channels[key].includes(socket.username));
    if (previousChannel !== undefined) {
      const index = channels[previousChannel].indexOf(socket.username);
      if (index !== -1) {
        channels[previousChannel].splice(index, 1);
      }
      io.to(previousChannel).emit('updateUserList', channels[previousChannel].map((user) => user.name));
      socket.leave(previousChannel);
    }
  
    // J'ajoute l'utilisateur au nouveau canal
    channels[channel].push(socket.username);
    io.to(channel).emit('updateUserList', channels[channel].map((user) => user.name));
    socket.join(channel);
  });
});

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Ma page d\'accueil',
    message: 'Bienvenue sur ce chat',
    channels: channels,
    users: connectedUsers.filter((user) => user.channel === "General").map((user) => user.name)
  });
});

app.use(express.static(path.join(__dirname, 'public')))

server.listen(port, () => console.log(`✓ Le serveur écoute sur le port ${port}`));
