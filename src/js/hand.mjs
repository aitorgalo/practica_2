// Importo módulo con las cartas
import { cardDatabase } from './cardDatabase/cardDatabase.mjs';

// Array con número de cartas
let hands_json = [2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 3, 2, 11, 9, 7];

// Constructor Card
class Card {

  constructor(cardPrototype) {

    // Get Card Prototype Values
    if (cardPrototype.type !== undefined) this.type = cardPrototype.type;
    if (cardPrototype.name !== undefined)this.name = cardPrototype.name;
    if (cardPrototype.nature !== undefined)this.nature = cardPrototype.nature;
    if (cardPrototype.vitality !== undefined)this.vitality = cardPrototype.vitality;
    if (cardPrototype.attacks !== undefined)this.attacks = cardPrototype.attacks;
    if (cardPrototype.weakness !== undefined)this.weakness = cardPrototype.weakness;
    if (cardPrototype.effect !== undefined)this.effect = cardPrototype.effect;
    if (cardPrototype.retire !== undefined)this.retire = cardPrototype.retire;

  }

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
        var card = new Card(cards[card_count]);
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

export { hand_player, hand_machine };