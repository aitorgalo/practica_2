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
    for (let card_count = 1; card_count <= 25; card_count++) {
      // Cantidad de Cartas
      let cantidad = hands_json['card_' + card_count];
      let total = 0;

      // Repito las cartas según mazo
      for (let index = 1; index <= cantidad; index++) {
        // Objeto Card
        var card = {
          name: cards_prototype.get('card_' + card_count).name,
          
          prototype: cards_prototype.get('card_' + card_count),
        };

        // Pongo Carta en Array
        this.cards.push(card);
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