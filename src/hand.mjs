import _ from 'lodash';

// Constructor Card
class Card {

  constructor(cardPrototype, image, id) {

    // Id of the Card (for equality)
    this.id = id;

    //Position of the Card (for the image)
    this.image = image;

    // Status . fight (Pokemon en Batalla) . dock (Pokemon en Banquillo) . hand (Carta en Mano) . deck (Carta en Mazo) . discard (Carta Utilizada descartada) . prize (Carta de Premio)
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

    // Energy (Only if Pokemon)
    if (this.type === `pokemon`) {
      this.energy = [];
    }

  }

  order() {

    // Orden
    let orden = 0;

    // Order by Type
    switch (this.type) {
      case 'pokemon': orden += 30; break;
      case 'energy': orden += 20; if (this.nature == 'fight') orden += 0.1; if (this.nature == 'electric') orden += 0.2; if (this.nature == 'fire') orden += 0.3; break;
      case 'object': orden += 10; break;
    }

    // Order by Status
    switch (this.status) {
      case 'fight': orden += 6; break;
      case 'dock': orden += 5; break;
      case 'hand': orden += 4; break;
      case 'deck': orden += 3; break;
      case 'discard': orden += 2; break;
      case 'dead': orden += 1; break;
    }

    // Return Order by
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
    this.robar = true;
    this.energy = true;
    this.retire = true;

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

    // Set 3 Cards Prize
    this.cards.filter(card => card.status === 'deck').slice(0, 3).map(card => card.status = 'prize');

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

  restartTurno() {
    // Restar Stats Hand 1
    this.status = 'playing';
    this.robar = true;
    this.energy = true;
    this.retire = true;
  }

  // Acciones Principales
  turno(input, output, hand_rival) {

    // Escoger Accion
    output.innerHTML = `Escoge Acción ${this.name}:`;
    let accion = 0;

    // Robar Carta de Deck a Hand x 1
    if (this.robar == true) {
      output.innerHTML += `<br>${++accion}) Coger carta`;
      if (accion == input) {
        if (this.cards.filter(card => card.status === 'deck').length > 0)
          this.cards.filter(card => card.status === 'deck')[0].status = 'hand';
        this.robar = false;
      }
    }

    // Atacar
    if (this.robar != true)
      this.cards.filter(card => card.status === 'fight').forEach(card => {

        // Pongo Cada Ataque disponible
        card.attacks.forEach(attack => {

          // Sólo si tengo suficiente energía


          output.innerHTML += `<br>${++accion}) Ataque ` + attack.name;

          // Si puedo Atacar
          if (accion == input) {

            // Quito la vida al rival
            hand_rival.cards.filter(cardRival => cardRival.status === 'fight').map(cardRival => cardRival.vitality_now -= attack.damage);

            // Efectos

            // Paso turno
            this.status = "next";

          }
        });
      });

    // Retirar Pokemon x 1
    if (this.robar != true)
      if (this.retire == true)
        if (this.cards.filter(card => card.status === 'fight').length == 1)
          if (this.cards.filter(card => card.status === 'dock').length < 5)
            this.cards.filter(card => card.status === 'fight').forEach(card => {
              output.innerHTML += `<br>${++accion}) Retirar PKMN ` + card.name + ` de fight a dock (banquillo)`;
              if (accion == input) {
                card.status = 'dock';
                this.retire = false;
              }
            });

    // Colocar Pokemon dock a fight
    if (this.robar != true)
      if (this.cards.filter(card => card.status === 'fight').length == 0)
        this.cards.filter(card => card.status === 'dock' && card.type === 'pokemon').forEach(card => {
          output.innerHTML += `<br>${++accion}) Colocar PKMN ` + card.name + ` a fight`;
          if (accion == input) {
            card.status = 'fight';
            card.evolved = true;
          }
        });

    // Colocar Pokemon hand a dock (Màx 5) x N
    if (this.robar != true)
      if (this.cards.filter(card => card.status === 'dock').length < 5)
        this.cards.filter(card => card.status === 'hand' && card.type === 'pokemon' && card.prevolution === undefined).forEach(card => {
          output.innerHTML += `<br>${++accion}) Colocar PKMN ` + card.name + ` a dock (banquillo)`;
          if (accion == input) {
            card.status = 'dock';
            card.evolved = true;
          }
        });

    // Evolucionar Pokemon x N
    if (this.robar != true)
      this.cards.filter(cardEvolution => cardEvolution.status === 'hand' && cardEvolution.type === 'pokemon' && cardEvolution.prevolution !== undefined)
        .sort((a, b) => b.order() - a.order()).forEach(cardEvolution => {
          // Sólo si tengo el Pokemon en Fight o Dock
          this.cards.filter(cardBase => (cardBase.status === 'fight' || cardBase.status === 'dock') && cardBase.type === 'pokemon' && cardBase.name === cardEvolution.prevolution)
            .sort((a, b) => b.order() - a.order()).forEach(cardBase => {

              output.innerHTML += `<br>${++accion}) Evolucionar PKMN ` + cardBase.name + ` a ` + cardEvolution.name;
              if (accion == input) {
                // Set Pokemon New
                cardEvolution.status = cardBase.status;
                cardEvolution.energy = cardBase.energy;
                cardEvolution.vitality_now -= (cardBase.vitality - cardBase.vitality_now);
                cardEvolution.evolved = true;

                // Set Pokemon Old
                cardBase.status = 'discard';

              }

            })

        });

    // Unir Carta energía x 1
    let combinacion = [];
    if (this.robar != true)
      if (this.energy == true)
        this.cards.filter(card => card.status === 'hand' && card.type === 'energy').sort((a, b) => b.order() - a.order()).forEach(card => {

          // Obtener Pokemons de Dock y Fight
          this.cards.filter(cardPokemon => (cardPokemon.status === 'dock' || cardPokemon.status === 'fight') && cardPokemon.type === 'pokemon')
            .sort((a, b) => b.order() - a.order()).forEach(cardPokemon => {

              // To not Repeat Combination
              if (!combinacion.includes(card.nature + "_" + cardPokemon.id)) {
                output.innerHTML += `<br>${++accion}) Unir energía ` + card.name + ` a ` + cardPokemon.name;
                if (accion == input) {
                  // Discard Energy Card
                  card.status = 'discard';

                  // Add Energy to Card
                  cardPokemon.energy.push(card.nature);

                  // Energy Turn is over
                  this.energy = false;
                }

                // Put Combination in Array
                combinacion.push(card.nature + "_" + cardPokemon.id);

              }

            })

        });

    // Jugar Carta Entrenador x N



    // Pasar Turno (sólo si hay algún activo luchando)
    if (this.robar != true)
      if (this.cards.filter(card => card.status === 'fight').length == 1) {
        output.innerHTML += `<br>${++accion}) Pasar turno`;
        if (accion == input) {
          this.status = "next";
        }
      }


    // Si mueren mis Pokemon (banquillo o lucha) lo descarto y doy mis premios
    hand_rival.cards.filter(card => (card.status === 'fight' || card.status === 'dock') && card.type === 'pokemon')
      .filter(card => card.vitality_now <= 0).forEach(card => {

        // If Available Prize
        if (hand_rival.cards.filter(cardRival => cardRival.status === 'prize').slice(0, 1).length > 0) {

          // Clone Card
          let clone = _.clone(hand_rival.cards.filter(cardRival => cardRival.status === 'prize').slice(0, 1)[0]);
          clone.status = 'hand';
          clone.id += 100;

          // Get Prize
          this.cards.push(clone);

          // Delete From Rival
          hand_rival.cards.filter(cardRival => cardRival.status === 'prize').slice(0, 1).map(card => card.status = 'discard');

        }

      });

    // Discard Death Pokemon
    hand_rival.cards.filter(card => (card.status === 'fight' || card.status === 'dock') && card.type === 'pokemon')
      .filter(card => card.vitality_now <= 0).map(card => card.status = 'discard');

  }


// Para ordenar la array
shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

}

// Export Class
export { Hand };