// Importo módulo con las cartas
import { cardDatabase } from './cardDatabase.mjs';

// Constructor Card
class Card {

  constructor(cardPrototype, image, id) {

    // Id of the Card (for equality)
    this.id = id;

    //Position of the Card (for the image)
    this.image = image;

    // Status . fight (Pokemon en Batalla) . dock (Pokemon en Banquillo) . hand (Carta en Mano) . deck (Carta en Mazo) . discard (Carta Utilizada descartada) . dead (Fuera de combate)
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
    if (cardPrototype.prevolution !== undefined) this.prevolution = cardPrototype.prevolution;

  }

  order() {

    // Orden
    let orden = 0;

    // Order by Type
    switch (this.type) {
      case 'pokemon': orden += 10;
      case 'energy': orden += 20;
      case 'object': orden += 30;
    }

    // Order by Status
    switch (this.status) {
      case 'fight': orden += 1;
      case 'dock': orden += 2;
      case 'hand': orden += 3;;
      case 'deck': orden += 4;
      case 'discard': orden += 5;
      case 'dead': orden += 6;
    }

    return orden;

  }

}

// Constructor Hand
class Hand {

  // To create Hand
  constructor(cardDatabase, name) {

    // Set Values
    this.name = name;
    this.cards = [];
    this.status = 'start';

    // Añado todas las Cards a mi array
    let id = 0;
    for (let card_count = 0; card_count < cardDatabase.length; card_count++) {

      // Repito las cartas según mazo
      for (let index = 1; index <= cardDatabase[card_count].cards_deck; index++) {

        // Objeto Card
        var card = new Card(cardDatabase[card_count], card_count + 1, ++id);

        // Pongo Carta en Array
        this.cards.push(card);

      }
    }
  }

  getFirstCards() {
    // Shuffle Cards First Time
    this.shuffle(this.cards);

    // Check First 7 Cards 1 base Pokemon
    while (this.cards.slice(0, 7).filter(card => card.type === 'pokemon' && card.prevolution === undefined).length == 0) {
      // Order Again
      this.shuffle(this.cards);
    }

    // Get First 7 Cards
    this.cards.slice(0, 7).map(card => card.status = 'hand');

  }

  firstTurno(input, output) {
    // First Turno
    if (this.cards.filter(card => card.status === 'fight').length != 1) {
      output.innerHTML = `Escoge Pokemon Activo ${this.name}:`;

      // Get Options
      let accion = 0;
      this.cards.filter(card => card.status === 'hand' && card.type === 'pokemon' && card.prevolution === undefined).forEach(card => {
        output.innerHTML += `<br>${++accion}) ` + card.name;
        if (accion == input) {
          card.status = 'fight';
        }
      });
    }
    else {
      this.firstTurnoDock(input, output);
    }
  }

  firstTurnoDock(input, output) {

    // Escoger Accion
    output.innerHTML = `Escoge Pokemon Banquillo ${this.name}:`;
    let accion = 0;

    // Set banquillo
    if (this.cards.filter(card => card.status === 'fight').length == 1) {


      // Get Options
      this.cards.filter(card => card.status === 'hand' && card.type === 'pokemon' && card.prevolution === undefined).forEach(card => {
        output.innerHTML += `<br>${++accion}) ` + card.name;
        if (accion == input) {
          card.status = 'dock';
        }
      });
    }

    // Saltar Turno
    output.innerHTML += `<br>${++accion}) Saltar turno`;
    // Saltar
    if (accion == input) {
      // Set Status Playing
      this.status = 'playing';
    }

  }

  // Acciones Principales
  turno(input, output) {

    // Escoger Accion
    output.innerHTML = `Escoge Acción ${this.name}:`;
    let accion = 0;

    // Robar Carta de Deck a Hand x 1
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      if (this.cards.filter(card => card.status === 'hand').length < 7) {
        output.innerHTML += `<br>${++accion}) Coger carta`;
        if (accion == input) {
          if (this.cards.filter(card => card.status === 'deck').length > 0)
            this.cards.filter(card => card.status === 'deck')[0].status = 'hand';
        }
      }

    // Colocar Pokemon dock a fight
    if (this.cards.filter(card => card.status === 'fight').length == 0)
      this.cards.filter(card => card.status === 'dock' && card.type === 'pokemon').forEach(card => {
        output.innerHTML += `<br>${++accion}) Colocar PKMN ` + card.name;
        if (accion == input) {
          card.status = 'fight';
        }
      });

    // Colocar Pokemon hand a dock (Màx 5) x N
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      if (this.cards.filter(card => card.status === 'dock').length < 5)
        this.cards.filter(card => card.status === 'hand' && card.type === 'pokemon' && card.prevolution === undefined).forEach(card => {
          output.innerHTML += `<br>${++accion}) Colocar PKMN ` + card.name;
          if (accion == input) {
            card.status = 'dock';
          }
        });

    // Evolucionar Pokemon x N
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      this.cards.filter(cardEvolution => cardEvolution.status === 'hand' && cardEvolution.type === 'pokemon' && cardEvolution.prevolution !== undefined)
        .sort((a, b) => b.order() - a.order()).forEach(cardEvolution => {
          // Sólo si tengo el Pokemon en Fight o Dock
          this.cards.filter(cardBase => (cardBase.status === 'fight' || cardBase.status === 'dock') && cardBase.type === 'pokemon' && cardBase.name === cardEvolution.prevolution)
            .sort((a, b) => b.order() - a.order()).forEach(cardBase => {

              output.innerHTML += `<br>${++accion}) Evolucionar PKMN ` + cardBase.name + ` a ` + cardEvolution.name;
              if (accion == input) {
                // Set Pokemon New
                cardEvolution.status = cardBase.status;

                // Set Pokemon Old
                cardBase.status = 'discard';



              }

            })

        });

    // Unir Carta energía x 1
    let combinacion = [];
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      this.cards.filter(card => card.status === 'hand' && card.type === 'energy').forEach(card => {

        // Obtener Pokemons de Dock y Fight
        this.cards.filter(cardPokemon => (cardPokemon.status === 'dock' || cardPokemon.status === 'fight') && cardPokemon.type === 'pokemon')
          .sort((a, b) => b.order() - a.order()).forEach(cardPokemon => {

            // To not Repeat Combination
            if (!combinacion.includes(card.nature + "_" + cardPokemon.id)) {
              output.innerHTML += `<br>${++accion}) Unir energía ` + card.name + ` a ` + cardPokemon.name;
              if (accion == input) {
                card.status = 'discard';
              }

              // Put Combination in Array
              combinacion.push(card.nature + "_" + cardPokemon.id);

            }

          })

      });

    // Jugar Carta Entrenador x N



    // Retirar Pokemon x 1
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      if (this.cards.filter(card => card.status === 'dock').length < 5)
        this.cards.filter(card => card.status === 'fight').forEach(card => {
          output.innerHTML += `<br>${++accion}) Retirar PKMN ` + card.name;
          if (accion == input) {
            card.status = 'dock';
          }
        });

    // Utilizar Habilidades x N




    // Atacar


    // Pasar Turno
    output.innerHTML += `<br>${++accion}) Pasar turno`;
    if (accion == input) {
      this.status = "next";
    }


  }

  // Para ordenar la array
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

}

// Export Class
export { Hand, cardDatabase };