// Importo módulo con las cartas
import { Hand, cardDatabase } from './hand.mjs';
// Importo módulo con el entorno gráfico
import { gui } from './gui.mjs';
class Game {
	// Crear mano de juego
	constructor(gui) {
		this.gui = gui;
		this.gui.initGUI(this);
		this.initGame();
	}

	sendCommand(input, output) {

		switch (input) {
			case "count": output.innerHTML = this.hand_player.cards.length; break;
			case "draw": this.gui.draw(); break;
			case "shuffle" : Hand.shuffle(this.hand_player.cards) ; break;
			case "print" : console.log(this.hand_player) ; break;
			case "clear" : console.clear(); break;
			case "restart": this.initGame();

			default:

		}

	}

	// Give Cards to users again
	initGame() {

		this.hand_player = new Hand(cardDatabase);

		// Get 7 Cards
		Hand.shuffle(this.hand_player.cards);
		this.hand_player.cards.slice(0,7).map(card => card.status = 'hand');


		this.hand_machine = new Hand(cardDatabase);


	}

}

// Create Game
let game = new Game(gui);

// Exporto módulo
export { game };