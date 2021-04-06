// Importo módulo con las cartas
import { Hand, cardDatabase } from './hand.mjs';

class Game {
	// Crear mano de juego

	constructor() {
		this.initGame();
	}

	sendCommand(input, output) {

		switch (input) {
			case "count": output.innerHTML = this.hand_player.cards.length; break;
			case "draw": this.drawTest(); break;
			case "restart": this.initGame();

			default:

		}

	}

	// Draw game test
	drawTest() {

		
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var image = document.getElementById('img_1');

		ctx.drawImage(image, 0, 0, 245, 342);
		ctx.drawImage(image, 0, 342, 245, 342);
	}

	// Give Cards to users again
	initGame() {
		this.hand_player = new Hand(cardDatabase);
		this.hand_machine = new Hand(cardDatabase);
	}

}

// Create Game
let game = new Game();

// Importo módulo con el entorno gráfico
import { initGUI } from './gui.mjs';
initGUI(game);

// Exporto módulo
export { game };