// console.table({
//     name: "Node.js",
//     gestionnaire_paquet: "npm"
// })

// console.log("Hello Node.js");

const os = require('os') // permer d'importer des modules natfis de Node
const { username } = os.userInfo()
const cpus = os.cpus().length

console.log(
    `cette machine appartient à ${username} qui est le plus barbu et a ${cpus} cpu`
);

process.stdout.write('Bonjour Pauline \n')