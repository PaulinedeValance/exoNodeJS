const http = require('http')
const { shuffle } = require('./src/utils');
const hostname = "localhost"
const port = "8002"

const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const userList = users.map(user => `<li>${user}</li>`).join('');
        res.end(`<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Liste des utilisateurs</title>
            </head>
        <body>
          <h1>Liste des utilisateurs :</h1>
          <ul>
            ${userList}
          </ul>
          <a href="/shuffle">Mélanger les utilisateurs</a>
        </body>
      </html>`
        )
    } else if (req.url === '/shuffle') {
        // Si l'URL est /shuffle, mélanger les utilisateurs
        const shuffledUsers = shuffle(users);
        users.splice(0, users.length, ...shuffledUsers);
        res.writeHead(302, { 'Location': '/' });
        res.end();
    }
})

server.listen(port, hostname, () => {
    console.log(`Tout est ok, server running at http://${hostname}:${port}/`);
})

