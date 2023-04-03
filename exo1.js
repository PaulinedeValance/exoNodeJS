// ### 01 Exercice 

// 1. Créer un petit jeu en console : on doit deviner un nombre compris entre 1 et 100. Si l'utilisateur propose un nombre plus petit on lui indique qui l'est plus grand et réciproquement. 

// 2. L'utilisateur à 10 tentatives pour deviner le nombre caché, après le jeu s'arrête. Si l'utilisateur trouve le nombre avant cette borne, le jeu s'arrête également. 

// 3. Pensez à gérer également les erreurs de saisi dans le jeu.


// import du module readline
const readline = require('readline');

// Création d'un chiffre aléatoire compris entre 1 et 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
// Nombre d'essai maximum
let tryNumber = 10;

// Création d'une nouvelle interface readline
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Création du prompt pour le terminal
terminal.setPrompt('Devinez le nombre :');
terminal.prompt();

terminal.on('line', (answer) => {
  const answerNum = parseInt(answer);

  // Si le nombre est trop grand, on le dit, et on décremente le nombre d'essais
  if (answerNum > randomNumber) {
    console.log('Trop grand');
    console.log(`Il reste ${tryNumber} essais`);
 
  // Si le nombre est trop petit, on le dit et on décremente le nombre d'essais
  } else if (answerNum < randomNumber) {
    console.log('Trop petit');
    console.log(`Il reste ${tryNumber} essais`);

  // Si le nombre correspond au nombre à deviner, le joueur a gagné et cela quitte le process  
  } else if (answerNum === randomNumber) {
    console.log('BRAVO');
    process.exit(0);
  // Si ce n'est pas le bon nombre, on le dit et on indique le nombre d'essai qu'il reste au joueur  
  } else {
    console.log("Ce n'est pas le bon chiffre");
    console.log(`Il reste ${tryNumber} essais`);
  }

  tryNumber--;

  // Si le joueur a utilisé tout ses essais, il perd et cela quitte le process
  if (tryNumber === 0) {
    console.log('PERDU');
    process.exit(0);
  }

  terminal.prompt();
});