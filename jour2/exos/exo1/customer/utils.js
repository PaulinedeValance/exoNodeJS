// Exporte la fonction pour calculer le prixTTC des fruits
exports.Utils = {
   calculTTC : function (prixHT) {
    const tauxTVA = 0.2;
    const montantTVA = prixHT * tauxTVA;
    const prixTTC = prixHT + montantTVA;
    return prixTTC;
  } 
}

