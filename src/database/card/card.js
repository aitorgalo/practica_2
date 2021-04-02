// Librería lectura de File System
const fs = require('fs');

// Constructor Card
class Card {
  constructor(data) {
    // Guardo el contenido del JSON en el Objeto Javascript
    this.type = data.type;
    this.name = data.name;
    this.nature = data.nature;
    this.vitality = data.vitality;
    this.attacks = data.attacks;
    this.weakness = data.weakness;
    this.retire = data.retire;
  }
}

// Busco todas las Cards
for (i = 1; i <= 25; i++) {
  card = new Card(JSON.parse(fs.readFileSync('card_' + i + '.json')));
  console.log(card);
}
