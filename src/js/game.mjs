// Importo módulo con las cartas
import { Hand, cardDatabase } from './hand.mjs';
// Importo módulo con el entorno gráfico
import { GUI } from './gui.mjs';
class Game {

	// Crear mano de juego
	constructor(gui) {
		this.gui = gui;
		this.gui.initGUI(this);
	}

	sendCommand(input, output) {

		switch (input) {
			case "start": this.initGame(input, output); this.draw(this.hands); break;
			case "print": console.log(this.hands); break;
			case "draw": this.draw(this.hands);
			case "clear": console.clear(); break;
			default: this.readGameState(input, output); this.readGameState("", output); this.draw(this.hands);

		}

	}

	// Give Cards to users again
	initGame(input, output) {

		// Create New Hand of Cards (For Player 1 and Player 2)
		this.hands = [new Hand(cardDatabase, "Player 1"), new Hand(cardDatabase, "Player 2")];

		// Get First 7 Cards
		this.hands[0].getFirstCards();
		this.hands[1].getFirstCards();

		// Read Game State
		this.readGameState(input, output);

	}

	// To Show Options to User
	readGameState(input, output) {

		// Set Active Pokemon Player 1
		if (this.hands[0].status === 'start') {
			this.hands[0].firstTurno(input, output);
		}
		else
			// Set Active Pokemon Player 1
			if (this.hands[1].status === 'start') {
				this.hands[1].firstTurno(input, output);
			}
			// Turno Normal
			else {

				// If Everybody Next Restart Turn
				if (this.hands[0].status === 'next' && this.hands[1].status === 'next') {
					// Restar Stats Hand 1
					this.hands[0].status = 'playing';
					this.hands[0].robar = true;
					this.hands[0].energy = true;
					this.hands[0].retire = true;

					// Restar Stats Hand 2
					this.hands[1].status = 'playing';
					this.hands[1].robar = true;
					this.hands[1].energy = true;
					this.hands[1].retire = true;
				}


				// If Everybody Plays . Plays Player 1
				if (this.hands[0].status === 'playing' && this.hands[1].status === 'playing')
					this.hands[0].turno(input, output);
				else
					if (this.hands[0].status === 'next' && this.hands[1].status === 'playing')
						this.hands[1].turno(input, output);



			}

	}

	// To Draw Cards to User
	draw(hands) {

		// Get Canvas
		var canvas = document.getElementById("canvas");
		canvas.width = (245 * 20) * 0.8;
		canvas.height = ((342 * 2) * 0.8) + 50;
		var ctx = canvas.getContext("2d");
		let column = 0;
		let row = 0;

		// Font Size
		ctx.font = "15px Georgia";

		// Get Hands
		hands.forEach(
			hand => {
				// Get All Pokemon Cards in Hand
				hand.cards.filter(card => (card.status === 'fight' || card.status === 'dock' || card.status === 'hand'))
					.sort((a, b) => b.order() - a.order())
					.forEach(card => {

						// Get Image
						var image = document.getElementById('img_' + card.image);

						// Card Image
						ctx.drawImage(image, (245 * 0.80) * (column), ((342 * 0.80) * row) , ( 245 * 0.80 ) , ( 342 * 0.80 ));

						// Info Text
						if (card.type === 'pokemon')
							ctx.fillText(card.vitality_now + ' PS', (245 * 0.80) * (column) , ((342 * 0.80) * row) );

						// Draw Text
						ctx.fillText(card.status, (245 * 0.80) * (column), ((342 * 0.80) * row));

						// Next Column
						column++;

					});

				// Print Extra Deck Fields
				// Draw Text
				ctx.fillText(hand.name, 0, ((342 * 0.80) * row) );

				// Next Row
				row++;
				column = 0;

			}

		);


	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };