const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const port = 9000;

let connectedUsers = [];

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} is connected via WebSockets`);


  socket.on('newUser', (username) => {
    connectedUsers = [...connectedUsers, username];
    io.emit('updateUserList', connectedUsers);
  });
  
  // Ajouter un utilisateur connecté à la liste des utilisateurs connectés
  // socket.on('newUser', (username) => {
  //   connectedUsers.push(username);
  //   io.emit('updateUserList', connectedUsers);
  // });

  // Mettre à jour le pseudo d'un utilisateur dans la liste des utilisateurs connectés
  socket.on('updateUsername', ({ oldUsername, newUsername }) => {
    const index = connectedUsers.indexOf(oldUsername);
    if (index !== -1) {
      connectedUsers.splice(index, 1, newUsername);
      io.emit('updateUserList', connectedUsers);
    }
  });

  // Envoyer un message à tous les utilisateurs connectés
  socket.on('sendMessage', ({ username, message }) => {
    io.emit('newMessage', { username, message });
  });

  // Supprimer un utilisateur déconnecté de la liste des utilisateurs connectés
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} is disconnected`);
    const index = connectedUsers.indexOf(socket.username);
    if (index !== -1) {
      connectedUsers.splice(index, 1);
      io.emit('updateUserList', connectedUsers);
    }
  });
});

// Configuration de Pug comme moteur de template par défaut
app.set('view engine', 'pug');

// Définir le dossier views comme le dossier contenant les vues
app.set('views', './views');

// Définir la route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Ma page d\'accueil',
    message: 'Bienvenue sur ce chat',
    users: connectedUsers
  });
});

app.use(express.static('public'));

server.listen(port, () => console.log(`✓ Le serveur écoute sur le port ${port}`));