// 1. Lisez le fichier à l'aide de la méthode asynchrone.

//const fs = require('fs')
// fs.readFile('students.txt', 'utf-8', (err, data) => {
//     if(err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
// })

// 1.(bis) Pour la suite utilisez l'approche synchrone afin de récupérer les données que vous pourrez exploiter par la suite dans le script.
const fs = require('fs')
// try {
//     const data = fs.readFileSync('students.txt', 'utf-8')
//     console.log(data);
// } catch(err) {
//     console.error(err);
// }


// 2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 de moyenne strictement.
try {
    const data = fs.readFileSync('students.txt', 'utf-8');

    // Créer un tableau pour stocker les données
    const students = [];

    // Utilisation du line pour diviser les données en lignes et les traiter
    data.split('\n').forEach(line => {
        const [notes, name] = line.split(' ');


        // Ajouter les informations de l'étudiant dans le tableau s'il a une moyenne supérieure à 17
        if (parseInt(notes) > 17) {
            students.push(name);
        }
    });

    console.log(students);
} catch (err) {
    console.error(err);
}

// 3. Recherchez dans le tableau l'étudiant qui a eu la meilleur note.
try {
    const data = fs.readFileSync('students.txt', 'utf-8');

    // Créer un tableau pour stocker les données
    const students = [];

     // Utilisation du line pour diviser les données en lignes et les traiter
    data.split('\n').forEach(line => {
        const [notes, name] = line.split(' ');

        // Si l'étudiant a une note au dessus de 17, je l'ajoute au tableau students
        if (parseInt(notes) > 17) {
            students.push({ notes: parseInt(notes), name: name });
        }
    });

    // Trier les étudiants par ordre décroissant en fonction de leurs notes et récupérer le premier élément du tableau trié
    const bestStudent = students.sort((a, b) => b.notes - a.notes)[0];
    console.log(`La meilleure étudiante est ${bestStudent.name}`);

} catch (err) {
    console.error(err);
}

// 4. Récupérez les données dans un objet student, puis ajoutez chaque étudiant dans un tableau students.

try {
    const data = fs.readFileSync('students.txt', 'utf-8');
    const students = [];

    data.split('\n').forEach(line => {
        const [notes, name, address] = line.split(' ');

        // Création d'un objet student
        const student = {
            notes: notes,
            name: name,
            address: address
        }

        students.push(student)
        //console.log(student);
    })

} catch (err) {
    console.error(err);
}

// 5. Ordonnez maintenant l'ensemble des données dans le tableau.

try {
    const data = fs.readFileSync('students.txt', 'utf-8');
    const students = [];
    
    data.split('\n').forEach(line => {
        const [notes, name, address] = line.split(' ');

        // Création d'un objet student
        const student = {
            notes: notes,
            name: name,
            address: address
        }

        students.push(student)
        //console.log(student);

    })

    // Tri des étudiants par notes, de la plus haute à la plus basse
    const sortStudents = students.sort((a, b) => b.notes - a.notes);
    console.log(sortStudents);

} catch (err) {
    console.error(err);
}

// 6. Ajoutez dans le fichier students.txt les étudiants suivants : 18 Jeanne Paris et 17 Clarisse Marseille
fs.appendFileSync('students.txt', '\n18 Jeanne Paris');
fs.appendFileSync('students.txt', '\n17 Clarisse Marseille');

// 7. Lire le fichier lui-même et mettez chaque nom en majuscule
try {
  // Lire le contenu du fichier
  const data = fs.readFileSync('students.txt', 'utf-8');

  // Mettre chaque nom en majuscule
  const uppercaseData = data.split('\n').map(line => {
    const [notes, name, address] = line.split(' ');
    return `${notes} ${name.toUpperCase()} ${address}`;
  }).join('\n');

  // Réécrire le fichier avec les noms en majuscule
  fs.writeFileSync('students.txt', uppercaseData);

  console.log('Noms en majuscule ajoutés au fichier !');
} catch (err) {
  console.error(err);
}