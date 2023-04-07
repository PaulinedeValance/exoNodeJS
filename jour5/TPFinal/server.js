const pug = require('pug')
require("dotenv").config()
const http = require('http')
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

const { addStudent, deleteStudent, students } = require('./utils');

const port = process.env.APP_PORT || 8005;
const hostname = process.env.APP_LOCALHOST || "localhost";

// Je parse les données du formulaire 
function parseFormData(formData) {
    const params = new URLSearchParams(formData);
    const name = params.get('name');
    const birth = params.get('birth');
    return { name, birth };
}

// Création du server 
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const form = fs.readFileSync(path.join(__dirname, 'view', 'home.html'))
        res.setHeader('Content-type', 'text/html')
        res.end(form)

    }
    else if (req.url === '/' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const name = params.get('name');
            const birth = params.get('birth');
            addStudent(name, birth, students);
            const studentList = students.map(student => ({
                ...student,
                formattedBirth: dayjs(student.birth).format('DD/MM/YYYY')
            }));
            const studentsHTML = generateStudentsHTML(studentList);
            const home = fs.readFileSync(path.join(__dirname, 'view', 'home.html'));
            const updatedHome = home.toString().replace('<!-- student-list -->', studentsHTML);
            res.setHeader('Content-Type', 'text/html');
            res.end(updatedHome);
        });
    
        
    } else if (req.url === '/students' && req.method === 'POST') {
        // traitement du formulaire pour ajouter un étudiant
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const { name, birth } = parseFormData(body);
            addStudent(name, birth, students);
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else if (req.url === '/students') {
        // j'affiche la liste des étudiants
        const studentList = students.map(student => ({
            ...student,
            formattedBirth: dayjs(student.birth).format('DD/MM/YYYY')
        }));
        const list = pug.renderFile(path.join(__dirname, 'view', 'students.pug'), { students: studentList });
        res.setHeader('Content-type', 'text/html');
        res.end(list);
    } else {
        // je renvoie une erreur 404 si l'URL demandée n'est pas valide
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.end("La page n'existe pas");
    }


})
// On démarre le serveur sur le port 8005
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})

