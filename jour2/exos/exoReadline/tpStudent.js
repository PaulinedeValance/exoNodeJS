const fs = require("fs");
const readline = require("readline");
const json = JSON.parse(fs.readFileSync("./Data/students.json"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function calculateAverage(student) {
    const sum = student.notes.reduce((acc, curr) => acc + curr);
    return sum / student.notes.length;
}

rl.setPrompt("Nom de l'étudiant: ");
rl.prompt();

rl.on("line", (line) => {
    const name = line.trim().toLowerCase();
    const student = json.find(
        (student) => student.name.toLowerCase() === name
    );
    if (student) {
        const average = calculateAverage(student);
        console.log(`${student.name}: ${average.toFixed(2)}`);
    } else {
        console.log(`Étudiant ${name} non trouvé.`);
    }
    rl.prompt();
}).on("close", () => {
    console.log("Au revoir !");
    process.exit(0);
});