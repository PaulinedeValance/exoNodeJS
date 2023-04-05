const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const hostname = "localhost"
const port = "8000"

// création de mon serveur
const server = http.createServer((req, res) => {
  // parse l'url 
  const parsedUrl = url.parse(req.url);
  // récupération du chemin de mon url
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // je récupère tous les users
    const usersDirectory = path.join(__dirname, 'data');
    // je récupère tous les fichiers
    const files = fs.readdirSync(usersDirectory);
    // je parcours avec map
    const users = files.map(file => {
      const data = fs.readFileSync(path.join(usersDirectory, file), 'utf-8');
      return data;
    });

    // J'envoie la réponse
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(`${users}`);

  } else if (pathname.startsWith('/search/')) {
    // je récupère un user en particulier avec la méthode split
    const username = pathname.split('/')[2];
    // j'accède au fichier json qui correspond à mon user
    const filepath = path.join(__dirname, 'data', `${username}.json`);

    if (fs.existsSync(filepath)) {
      // Si mon chemin existe, son contenu est lu grâce à readFileSync et l'envoie en réponse
      const data = fs.readFileSync(filepath);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } else {
      // Si il n'existe pas, on renvoi une erreur 404
      res.writeHead(404);
      res.end(JSON.stringify({ message: "L'utilisateur n'a pas été trouvé" }));
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Tout est ok, server running at http://${hostname}:${port}/`);
});