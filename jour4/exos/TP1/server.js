const http = require('http')
const fs = require('fs');
const hostname = "localhost"
const port = "8000"

const students = [
    { name: "Sonia" },
    { name: "Antoine" }
];

const server = http.createServer((req, res) => {
    
    if (url === "bootstrap") {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
        res.write(css);
        res.end();
    
        return;
      }


    if (req.method === 'POST') {
        // Handle post info...
        let body = '';
        req.on('data', data => {
            body += data;
        });

        // On écoute maintenant la fin de l'envoi des données avec la méthode on et l'attribut end
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end( JSON.stringify({ "result" : body }));
            students.push({body});
        });
    }
})
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})


