// Importo módulo con las cartas
import { cardDatabase } from './cardDatabase.mjs';

// Constructor Card
class Card {

  constructor(cardPrototype, position) {

    //Position of the Card (for the image)
    this.image = position;

    // Status . fight (Pokemon en Batalla) . dock (Pokemon en Banquillo) . hand (Carta en Mano) . deck (Carta en Mazo) . discard (Carta Utilizada descartada)
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

  // To create Hand
  constructor(cardDatabase) {
    // Añado todas las Cards a mi array
    for (let card_count = 0; card_count < cardDatabase.length; card_count++) {

      // Repito las cartas según mazo
      for (let index = 1; index <= cardDatabase[card_count].cards_deck; index++) {

        // Objeto Card
        var card = new Card(cardDatabase[card_count], card_count + 1);

        // Pongo Carta en Array
        this.cards.push(card);

      }
    }
  }

getFirstCards()
{
  // Shuffle Cards First Time
  this.shuffle(this.cards);

  // Get First 7 Cards
  this.cards.slice(0, 7).map(card => card.status = 'hand');

}

  // Para ordenar la array
shuffle(array) {

 array.sort(() => Math.random() - 0.5);
}

}

// Export Class
export { Hand, cardDatabase };