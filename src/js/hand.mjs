// Importo módulo con las cartas
import { cardDatabase } from './cardDatabase/cardDatabase.mjs';

// Array con número de cartas
let hands_json = [2 , 1 ,  1 ,  2 , 1 , 2 , 1 , 2 ,  1 , 2 , 1 , 1 , 2 , 1 , 1 , 1 , 2 , 1 , 1 , 2 , 3 , 2 , 11 , 9 , 7];

// Constructor Card
class Card{
  
}

// Constructor Hand
class Hand {
  // Init Cards
  cards = [];

  constructor(cards) {
    // Añado todas las Cards a mi array
    for (let card_count = 0; card_count < 25; card_count++) {
      // Cantidad de Cartas
      let cantidad = hands_json[card_count];
      let total = 0;

      // Repito las cartas según mazo
      for (let index = 1; index <= cantidad; index++) {
        // Objeto Card
        var card = {
          name: cards[card_count].name,
          prototype: cards[card_count]
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
let hand_player = new Hand(cardDatabase);
let hand_machine = new Hand(cardDatabase);

console.log(hand_player);

export { hand_player , hand_machine };