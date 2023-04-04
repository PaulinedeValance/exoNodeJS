// Créez un dossier customer dans lequel vous créez deux fichiers utils.js et index.js, le fichier utils est un module permettant d'écrire le code métier.

// Dans le fichier index.js importez le code, vos fonctions par exemple, permettant de mettre les prix TTC de l'objet priceHT suivant, vous ajouterez le prix TTC dans le tableau priceHT.

// import 
//const calculDeTVA = require('./utils')
const { Utils } = require('./utils');

const priceHT = [
    { name: "Apple", priceHT: 1.0, priceTTC: null },
    { name: "Orange", priceHT: 1.2, priceTTC: null },
    { name: "Rasberry", priceHT: 2.5, priceTTC: null },
];

priceHT.forEach((item) => {
    item.priceTTC = Utils.calculTTC(item.priceHT);
});

console.log(priceHT);

// Modifiez le tableau pour mettre les prix TTC