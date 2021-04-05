// Importo módulo con las cartas
import { cardDatabase } from './cardDatabase/cardDatabase.mjs';

// Array con número de cartas
let hands_json = {

  "card_1" : 2 ,
  "card_2" : 1 , 
  "card_3" : 1 , 
  "card_4" : 2 ,
  "card_5" : 1 ,
  "card_6" : 2 ,
  "card_7" : 1 ,
  "card_8" : 2 , 
  "card_9" : 1 ,
  "card_10" : 2 ,
  "card_11" : 1 ,
  "card_12" : 1 ,
  "card_13" : 2 ,
  "card_14" : 1 ,
  "card_15" : 1 ,
  "card_16" : 1 ,
  "card_17" : 2 ,
  "card_18" : 1 ,
  "card_19" : 1 ,
  "card_20" : 2 ,
  "card_21" : 3 ,
  "card_22" : 2 ,
  "card_23" : 11 ,
  "card_24" : 9 ,
  "card_25" : 7
  
  };

// Constructor Card
class Card{
  
}

// Constructor Hand
class Hand {
  // Init Cards
  cards = [];

  constructor(cards) {
    // Añado todas las Cards a mi array
    for (let card_count = 1; card_count <= 25; card_count++) {
      // Cantidad de Cartas
      let cantidad = hands_json['card_' + card_count];
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

export { hand_player , hand_machine };