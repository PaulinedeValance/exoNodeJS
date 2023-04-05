// Création de l'algo pour shuffle mon tableau de users
function shuffle(users) {
    return users.sort(() => 0.5 - Math.random());
} 

module.exports = {
    shuffle
}