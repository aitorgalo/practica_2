// Importo módulo con las cartas
import { Hand, cardDatabase } from './hand.mjs';

class Game {
	// Crear mano de juego

	constructor() {
		this.initGame();
	}

	sendCommand(input, display) {

		switch (input) {
			case "count": display.innerHTML = this.hand_player.cards.length; break;
			case "remove": this.hand_player.remove(); break;
			case "draw": this.drawTest(); break;
			case "draw2": this.drawTest2(); break;
			case "restart": this.initGame();


			default:



		}



	}

// Draw game test
drawTest()
{

	var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById('source');

ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
}

// Draw game test
drawTest2()
{

	var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById('source2');

ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
}


	// Give Cards to users again
	initGame() {
		this.hand_player = new Hand(cardDatabase);
		this.hand_machine = new Hand(cardDatabase);
	}

}

let game = new Game();

// Exporto módulo
export { game };