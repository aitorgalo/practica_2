// Librería lectura de File System
import fs from 'fs';

// Constructor Card
class Card {
  constructor(number,data) {
    // Guardo el contenido del JSON en el Objeto Javascript
    this.type = data.type;
    this.name = data.name;
    this.nature = data.nature;
    this.vitality = data.vitality;
	this.hability = data.hability;
	this.strong = data.strong;
    this.attacks = data.attacks;
    this.weakness = data.weakness;
	this.effect = data.effect;
    this.retire = data.retire;
  }
    
}

// Creo mapa de las Cards
let cards = new Map();

// Busco todas las Cards
for (let i = 1; i <= 25; i++) {
  let card = new Card(i,JSON.parse(fs.readFileSync('database/card_' + i + '.json')));
  cards.set('card_' + i,card);
}

// Obtengo listado de todas las cards
export { cards };