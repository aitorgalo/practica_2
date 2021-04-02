// Importo módulo con las cartas
import { cards as cards_prototype } from './card/card.mjs';

// Importo lectura
import fs from 'fs';

// Constructor Hand
class Hand {
  // Init Cards
  cards = [];

  constructor(cards_prototype) {
    // Obtengo JSON para mirar las cartas
    let hands_json = JSON.parse(fs.readFileSync('database/hand.json'));

    // Añado todas las Cards a mi array
    for (let card = 1; card <= 25; card++) {
      // Cantidad de Cartas
      let cantidad = hands_json['card_' + card];

      for(let index = 1 ; index <= cantidad ; index++)
      {
      this.cards.push(cards_prototype.get('card_' + card));



    }

    }
  }
}

// Crear mano de juego
let hand = new Hand(cards_prototype);
console.log(hand.cards);