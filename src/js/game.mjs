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
			case "start": this.initGame(this.gui); this.draw(this.hands); break;
			case "draw": this.draw(this.hands); break;
			case "clean": this.gui.clean(); break;
			case "shuffle": Hand.shuffle(this.hand_player.cards); break;
			case "print": console.log(this.hands); break;
			case "clear": console.clear(); break;

			default:

		}

	}

	// Give Cards to users again
	initGame() {

		// Create New Hand of Cards (For Player 1 and Player 2)
		this.hands = [new Hand(cardDatabase), new Hand(cardDatabase)];

		// Get First 7 Cards
		this.hands[0].getFirstCards();
		this.hands[1].getFirstCards();

	}

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
			hands[j].cards.filter(card => card.status === 'hand').sort((a, b) => b.type.localeCompare(a.type)).forEach(card => {

				// Get Image
				var image = document.getElementById('img_' + card.image);

				// Enemy Cards
				ctx.drawImage(image, (245 * 0.80) * (i), (342 * 0.80) * j, 245 * 0.80, 342 * 0.80);
				i++;

			});

		}

		// My Cards
		// ctx.drawImage(image, 0, 342 * 0.80 , 245 * 0.80 , 342 * 0.80 );
	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };