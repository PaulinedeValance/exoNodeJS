// importation du module readline
var readline = require('readline')

// tableau avec des noms d'étudiants
const students = ["Alan", "Sonia", "Sophie"];

// création interface readline
rl = readline.createInterface(process.stdin, process.stdout)

// On pose une question à l'utilisateur
rl.question("Nom de l'étudiant svp ?", function(name) {
    // suppression espaces et tout est mis en minuscule
    const studentName = name.trim().toLowerCase()
    // recheche de l'étudiant correspondant
    const guessStudent = students.find(student => student.toLowerCase() === studentName);
    console.log(guessStudent);

    // si l'étudiant a été trouvé dans le tableau on affiche son nom avec un message
    if(guessStudent) {
        console.log(`${studentName} est bien un élève`);
    // sinon affiche message "étudiant non trouvé"    
    } else {
        console.log("Etudiant non trouvé");
    }

    // fermeture
    rl.close()
})
