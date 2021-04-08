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
			case "start": this.initGame(input, output);  this.draw(this.hands);  break;
			case "print": console.log(this.hands); break;
			case "clear": console.clear(); break;
			default: this.readGameState(input, output);   this.draw(this.hands); this.readGameState("", output);

		}

	}

	// Give Cards to users again
	initGame(input, output) {

		// Create New Hand of Cards (For Player 1 and Player 2)
		this.hands = [new Hand(cardDatabase, "Player 1"), new Hand(cardDatabase, "Player 2")];

		// Get First 7 Cards
		this.hands[0].getFirstCards();
		this.hands[1].getFirstCards();

		// Init Turnos
		this.turno = 0;

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
				this.hands[0].turno(input, output);
			}

	}

	// To Draw Cards to User
	draw(hands) {

		// Get Canvas
		var canvas = document.getElementById("canvas");
		canvas.width = (245 * 20) * 0.8;
		canvas.height = (342 * 2) * 0.8;
		var ctx = canvas.getContext("2d");

		// Get Hands
		for (let j = 0; j < hands.length; j++) {

			// Counter
			let i = 0;

			// Get All Pokemon Cards in Hand
			hands[j].cards.filter(card => ( card.status === 'fight' || card.status === 'dock' ||  card.status === 'hand' )).sort((a, b) => b.type.localeCompare(a.type)).forEach(card => {

				// Get Image
				var image = document.getElementById('img_' + card.image);

				// Enemy Cards
				ctx.drawImage(image, (245 * 0.80) * (i), (342 * 0.80) * j, 245 * 0.80, 342 * 0.80);
				i++;

			});

		}

	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };