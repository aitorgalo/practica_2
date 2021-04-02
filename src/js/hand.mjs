// Importo módulo con las cartas
import { cards as cards_prototype } from './card/card.mjs';

// Importo lectura
import fs from 'fs';

// Constructor Hand
class Hand {
  // Init Cards
  Cards = [];

  constructor(cards_prototype) {
    // Obtengo JSON para mirar las cartas
    let hands_json = JSON.parse(fs.readFileSync('database/hand.json'));

    // Añado todas las Cards a mi array
    for (let card = 1; card <= 25; card++) {
      // Cantidad de Cartas
      let cantidad = hands_json['card_' + card];

      for (let index = 1; index <= cantidad; index++) {

        this.Cards.push(cards_prototype.get('card_' + card));
      }
    }
  }
}

// Para ordenar la array
function orderArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Crear mano de juego
let hand_player = new Hand(cards_prototype);
let hand_machine = new Hand(cards_prototype);