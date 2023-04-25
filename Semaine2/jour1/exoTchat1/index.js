const express = require('express')
const http = require('http');
const { connect } = require('http2');
const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

const port = 9000

let connectedUsers = []

io.on('connection', (socket) => {
    connectedUsers.push('JeffB')
    io.emit('updateUserList', connectedUsers);
})

// io.on('connection', (socket) => {
//     console.log('Client', socket.id, 'is connected via WebSockets')
// })

// Configuration de Pug comme moteur de template par défaut
app.set('view engine', 'pug');

// Définir le dossier views comme le dossier contenant les vues
app.set('views', './views');

// Définir la route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('index', { title: 'Ma page d\'accueil', message: 'Bienvenue sur ce chat', users: connectedUsers });
  });

app.use(express.static('public'));



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

server.listen(port, () => console.log(`✓ Le serveur écoute sur le port ${port}`))