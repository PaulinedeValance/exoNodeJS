var readline = require('readline')

const students = ["Alan", "Sonia", "Sophie"];

rl = readline.createInterface(process.stdin, process.stdout)

rl.question("Nom de l'étudiant svp ?", function(name) {
    const studentName = name.trim().toLowerCase()
    const guessStudent = students.find(student => student.toLowerCase() === studentName);
    console.log(guessStudent);

    if(studentName) {
        console.log(`${guessStudent} est bien un élève`);
    } else {
        console.log("Etudiant non trouvé");
    }

    rl.close()
})
