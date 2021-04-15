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
    this.attacked = false;
    this.turno_partida = 1;

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
        output.innerHTML += `<br>${++accion}) ${card.name}`;
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
        output.innerHTML += `<br>${++accion}) ${card.name}`;
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
    this.attacked = false;
    this.turno_partida++; 
  }

  // Acciones Principales
  turno(input, output, hand_rival) {

    // Escoger Accion
    output.innerHTML = `Escoge Acción ${this.name}:`;
    let accion = 0;

      // If 0 prizes or 0 Pokemon in dock or fight, dead
      if ( (this.cards.filter(card => card.type === 'pokemon' && (card.status === 'fight' || card.status === 'dock') ).length == 0)
      ||
     (this.cards.filter(card => card.status === 'prize').length == 0) )
      {
        output.innerHTML += `<br>¡ Has perdido (3 PKMN eliminados o ninguno en FIGHT o DOCK) !¡ Pide la revancha con el comando start !`;
        this.dead = true;
      }

    // Robar Carta de Deck a Hand x 1
    if(this.dead != true)
    if (this.robar == true)
    {
      // Si tengo cartas robo
      if (this.cards.filter(card => card.status === 'deck').length > 0)
      {

      output.innerHTML += `<br>${++accion}) Coger carta`;
      if (accion == input) {

          this.cards.filter(card => card.status === 'deck')[0].status = 'hand';
        this.robar = false;
      }
      }
       // Sino hago como que he robado
      else
       {
              this.robar = false;
       }
    }
    

    // Atacar
    if(this.dead != true)
    if (this.robar != true)
    if (this.attacked != true)
      this.cards.filter(card => card.status === 'fight').forEach(card => {

        // Pongo Cada Ataque disponible
        card.attacks.forEach(attack => {

          // Sólo si tengo suficiente energía
          var countsAttack = { fight: 0, electric: 0, fire: 0, any: 0 }
          attack.cost.forEach(function (x) { countsAttack[x] = (countsAttack[x] || 0) + 1; });

          // Energy Pokemon
          var countsPokemon = { fight: 0, electric: 0, fire: 0 }
          card.energy.forEach(function (x) { countsPokemon[x] = (countsPokemon[x] || 0) + 1; });

          // Sólo ataco si tengo suficientes energías
          if ((countsPokemon.fight >= countsAttack.fight) && (countsPokemon.electric >= countsAttack.electric)
            && (countsPokemon.fire >= countsAttack.fire) &&

            ((countsPokemon.fight + countsPokemon.electric + countsPokemon.fire) >=
              (countsAttack.fight + countsAttack.electric + countsAttack.fire + countsAttack.any))) {

            output.innerHTML += `<br>${++accion}) Ataque ${attack.name}`;

            // Si puedo Atacar
            if (accion == input) {

              // Quito la vida al rival
              hand_rival.cards.filter(cardRival => cardRival.status === 'fight').map(cardRival => cardRival.vitality_now -= attack.damage);

              // Efectos
              switch (attack.effect) {
                case "discard 1 fire": card.energy.splice(card.energy.indexOf('fire'), 1); break;
                case "change pokemon": card.status = 'dock' ; break;
                case "random autoattack 10": card.vitality_now -= Math.round(Math.random()) * 10 ; break;
                case "autoattack 30": card.vitality_now -= 30 ; break;
                case "discard all energy": card.energy = []; break;
                case "random 20 x 2": cardRival.vitality_now -= Math.round(Math.random()) * 20 ; cardRival.vitality_now -= Math.round(Math.random()) * 20 ;  break;
              }

              // Paso turno
              if(! attack.effect === `change pokemon`)
              this.status = "next";
              else
              this.attacked = true;

            }

          }

        });
      });

    // Colocar Pokemon dock a fight
    if(this.dead != true)
    if (this.robar != true)
      if (this.cards.filter(card => card.status === 'fight').length == 0)
        this.cards.filter(card => card.status === 'dock' && card.type === 'pokemon').forEach(card => {
          output.innerHTML += `<br>${++accion}) Colocar PKMN ${card.name} DOCK a FIGHT`;
          if (accion == input) {
            card.status = 'fight';
          }
        });

    // Colocar Pokemon hand a dock (Màx 5) x N
    if(this.dead != true)
    if (this.robar != true)
    if (this.attacked != true)
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      if (this.cards.filter(card => card.status === 'dock').length < 5)
        this.cards.filter(card => card.status === 'hand' && card.type === 'pokemon' && card.prevolution === undefined).forEach(card => {
          output.innerHTML += `<br>${++accion}) Colocar PKMN ${card.name} HAND a DOCK`;
          if (accion == input) {
            card.status = 'dock';
          }
        });

    // Evolucionar Pokemon x N
    if(this.dead != true)
    if (this.robar != true)
    if(this.turno_partida != 1)
    if (this.attacked != true)
      this.cards.filter(cardEvolution => cardEvolution.status === 'hand' && cardEvolution.type === 'pokemon' && cardEvolution.prevolution !== undefined)
        .sort((a, b) => b.order() - a.order()).forEach(cardEvolution => {
          // Sólo si tengo el Pokemon en Fight o Dock
          this.cards.filter(cardBase => (cardBase.status === 'fight' || cardBase.status === 'dock') && cardBase.type === 'pokemon' && cardBase.name === cardEvolution.prevolution)
            .sort((a, b) => b.order() - a.order()).forEach(cardBase => {

              output.innerHTML += `<br>${++accion}) Evolucionar PKMN ${cardBase.name} (${cardBase.status.toUpperCase()}) a ${cardEvolution.name}`;
              if (accion == input) {
                // Set Pokemon New
                cardEvolution.status = cardBase.status;
                cardEvolution.energy = cardBase.energy;
                cardEvolution.vitality_now -= (cardBase.vitality - cardBase.vitality_now);

                // Set Pokemon Old
                cardBase.status = 'discard';

              }

            })

        });

    // Unir Carta energía x 1
    let combinacion = [];
    if(this.dead != true)
    if (this.robar != true)
    if (this.attacked != true)
      if (this.energy == true)
      if (this.cards.filter(card => card.status === 'fight').length == 1)
        this.cards.filter(card => card.status === 'hand' && card.type === 'energy').sort((a, b) => b.order() - a.order()).forEach(card => {

          // Obtener Pokemons de Dock y Fight
          this.cards.filter(cardPokemon => (cardPokemon.status === 'dock' || cardPokemon.status === 'fight') && cardPokemon.type === 'pokemon')
            .sort((a, b) => b.order() - a.order()).forEach(cardPokemon => {

              // To not Repeat Combination
              if (!combinacion.includes(card.nature + "_" + cardPokemon.id)) {
                output.innerHTML += `<br>${++accion}) Unir energía ${card.name} a ${cardPokemon.name} (${cardPokemon.status.toUpperCase()})` ;
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
    combinacion = [];
    if(this.dead != true)
    if (this.robar != true)
    if (this.attacked != true)
    if (this.cards.filter(card => card.status === 'fight').length == 1)
      this.cards.filter(card => card.status === 'hand' && card.type === 'object').sort((a, b) => b.order() - a.order()).forEach(card => {

        // Obtener Pokemons de Dock y Fight
        this.cards.filter(cardPokemon => (cardPokemon.status === 'dock' || cardPokemon.status === 'fight') && cardPokemon.type === 'pokemon' && cardPokemon.vitality_now < cardPokemon.vitality)
          .sort((a, b) => b.order() - a.order()).forEach(cardPokemon => {

            // To not Repeat Combination
            if (!combinacion.includes(card.name + "_" + cardPokemon.id)) {
              output.innerHTML += `<br>${++accion}) Usar Objeto ${card.name} en ${cardPokemon.name} (${cardPokemon.status.toUpperCase()})`;
              if (accion == input) {
                // Discard Object Card
                card.status = 'discard';

                // Add HP to Card
                cardPokemon.vitality_now += card.effect;
                if (cardPokemon.vitality_now > cardPokemon.vitality) cardPokemon.vitality_now = cardPokemon.vitality;

              }

              // Put Combination in Array
              combinacion.push(card.name + "_" + cardPokemon.id);

            }

          })

      });

    // Retirar Pokemon x 1
    if (this.robar != true)
    if(this.dead != true)
      if (this.retire == true)
      if (this.attacked != true)
        if (this.cards.filter(card => card.status === 'fight').length == 1)
          if (this.cards.filter(card => card.status === 'dock').length < 6)
            this.cards.filter(card => card.status === 'fight').forEach(card => {

              // Si tengo suficiente energía como para retirarlo
              if (card.energy.length >= card.retire) {
                output.innerHTML += `<br>${++accion}) Retirar PKMN ${card.name} FIGHT a DOCK`;
                if (accion == input) {

                  // Retiro al dock
                  card.status = 'dock';
                  this.retire = false;

                  // Quito Energía necesaria  
                  card.energy.splice(0, card.retire);

                }

              }

            });

    // Pasar Turno (sólo si hay algún activo luchando)
    if(this.dead != true)
    if (this.robar != true)
      if (this.cards.filter(card => card.status === 'fight').length == 1) {
        output.innerHTML += `<br>${++accion}) Pasar turno`;
        if (accion == input) {
          this.status = "next";
        }
      }

      // Eliminar Pokemon
      this.eliminar(this,hand_rival);
      this.eliminar(hand_rival,this);


  }

 // Para eliminar Pokemon
 eliminar(hand_1 , hand_2)
 {

    // Si mueren mis Pokemon (banquillo o lucha) lo descarto y doy mis premios
    hand_2.cards.filter(card => (card.status === 'fight' || card.status === 'dock') && card.type === 'pokemon')
      .filter(card => card.vitality_now <= 0).forEach(card => {

        // If Available Prize
        if (hand_2.cards.filter(cardRival => cardRival.status === 'prize').slice(0, 1).length > 0) {

          // Clone Card
          let clone = _.clone(hand_2.cards.filter(cardRival => cardRival.status === 'prize').slice(0, 1)[0]);
          clone.status = 'hand';
          clone.id += 100;

          // Get Prize
          hand_1.cards.push(clone);

          // Delete From Rival
          hand_2.cards.filter(cardRival => cardRival.status === 'prize').slice(0, 1).map(card => card.status = 'discard');

        }

      });

    // Discard Death Pokemon
    hand_2.cards.filter(card => (card.status === 'fight' || card.status === 'dock') && card.type === 'pokemon')
      .filter(card => card.vitality_now <= 0).map(card => card.status = 'discard');

 }


  // Para ordenar la array
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

}

// Export Class
export { Hand };