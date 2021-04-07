// Importo módulo con las cartas
import { Hand, cardDatabase } from './hand.mjs';
// Importo módulo con el entorno gráfico
import { GUI } from './gui.mjs';
class Game {

	// Crear mano de juego
	constructor(gui) {
		this.gui = gui;
		this.gui.initGUI(this);
		this.initGame(this.gui);
	}

	sendCommand(input, output) {

		switch (input) {
			case "draw": this.draw(this.hand_player.cards,this.hand_machine.cards); break;
			case "clean": this.gui.clean(); break;
			case "shuffle": Hand.shuffle(this.hand_player.cards); break;
			case "print": console.log(this.hand_player.cards); console.log(this.hand_machine.cards); break;
			case "clear": console.clear(); break;
			case "start": this.initGame(this.gui);

			default:

		}

	}

	// Give Cards to users again
	initGame() {

		// Create New Hand of Cards
		this.hand_player = new Hand(cardDatabase);

		// Get 7 Cards Player
		Hand.shuffle(this.hand_player.cards);
		this.hand_player.cards.slice(0, 7).map(card => card.status = 'hand');

		// Get 7 Cards Machine
		this.hand_machine = new Hand(cardDatabase);

		// Get 7 Cards Machine
		Hand.shuffle(this.hand_machine.cards);
		this.hand_machine.cards.slice(0, 7).map(card => card.status = 'hand');

	}

	draw(cards_player , cards_machine) {

		// Get Canvas
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		
		// Delete Old Content
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Get All Cards in Hand
console.log(cards_player.filter(card => card.status === 'hand').filter(card => card.type === 'pokemon'));


		var image = document.getElementById('img_2');

		// Enemy Cards
		ctx.drawImage(image, 0, 0, 245 * 0.80 , 342 * 0.80);

		// My Cards
		ctx.drawImage(image, 0, 342 * 0.80 , 245 * 0.80 , 342 * 0.80 );
	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };