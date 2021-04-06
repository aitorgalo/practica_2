// Importo módulo con las cartas
import { cardDatabase } from './cardDatabase.mjs';

// Constructor Card
class Card {

  constructor(cardPrototype) {

    // Status . fight (Pokemon en Batalla) . dock (Pokemon en Banquillo) . deck (Carta en Mazo) . discard (Carta Utilizada descartada)
    this.status = 'deck';

    // Get Card Prototype Values
    if (cardPrototype.type !== undefined) this.type = cardPrototype.type;
    if (cardPrototype.name !== undefined) this.name = cardPrototype.name;
    if (cardPrototype.nature !== undefined) this.nature = cardPrototype.nature;

    // Asigno Vida máxima a carta
    if (cardPrototype.vitality !== undefined) {
      this.vitality = cardPrototype.vitality;
      this.vitality_now = cardPrototype.vitality;
    }

    // Other Values
    if (cardPrototype.attacks !== undefined) this.attacks = cardPrototype.attacks;
    if (cardPrototype.weakness !== undefined) this.weakness = cardPrototype.weakness;
    if (cardPrototype.effect !== undefined) this.effect = cardPrototype.effect;
    if (cardPrototype.retire !== undefined) this.retire = cardPrototype.retire;

  }

}

// Constructor Hand
class Hand {
  // Init Cards
  cards = [];

  constructor(cardDatabase) {
    // Añado todas las Cards a mi array
    for (let card_count = 0; card_count < cardDatabase.length; card_count++) {

      // Repito las cartas según mazo
      for (let index = 1; index <= cardDatabase[card_count].cards_deck; index++) {

        // Objeto Card
        var card = new Card(cardDatabase[card_count]);

        // Pongo Carta en Array
        this.cards.push(card);

      }
    }
  }

  remove() {
    this.cards.pop();
  }

}

// Para ordenar la array
function orderArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Export Class
export { Hand, cardDatabase };