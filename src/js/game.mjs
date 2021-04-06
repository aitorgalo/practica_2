// Importo módulo con las cartas
import { Hand, cardDatabase } from './hand.mjs';
// Importo módulo con el entorno gráfico
import { GUI } from './gui.mjs';
class Game {
	// Crear mano de juego
	constructor(gui) {
		this.gui = gui;
		this.initGame(gui);		
		this.gui.initGUI(this);
	}

	sendCommand(input, output) {

		switch (input) {
			case "count": output.innerHTML = this.hand_player.cards.length; break;
			case "draw": this.draw(); break;
			case "clean": this.gui.clean(); break;
			case "shuffle" : Hand.shuffle(this.hand_player.cards) ; break;
			case "print" : console.log(this.hand_player) ; break;
			case "clear" : console.clear(); break;
			case "restart": this.initGame();

			default:

		}

	}

	// Give Cards to users again
	initGame() {

		// Create New Hand of Cards
		this.hand_player = new Hand(cardDatabase);

		// Get 7 Cards
		Hand.shuffle(this.hand_player.cards);
		this.hand_player.cards.slice(0,7).map(card => card.status = 'hand');
		this.hand_machine = new Hand(cardDatabase);
	}

	draw() {
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var image = document.getElementById('img_1');
	
		ctx.drawImage(image, 0, 0, 245, 342);
		ctx.drawImage(image, 0, 342, 245, 342);
	
		ctx.beginPath();
		ctx.rect(20, 20, 150, 100);
	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };