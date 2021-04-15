// Import Card Database
import cardDatabase from '/database/cardDatabase.json';

// Importo módulo con las cartas
import { Hand } from './hand.mjs';
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
			case "start": this.initGame(input, output); this.gui.draw(this.hands); break;
			case "print": console.log(this.hands); break;
			case "clear": console.clear(); break;
			default: this.readGameState(input, output); this.readGameState("", output); this.gui.draw(this.hands);
		}
	}

	// Give Cards to users again
	initGame(input, output) {

		// Create New Hand of Cards (For Player 1 and Player 2)
		this.hands = [new Hand(cardDatabase.cards, "Player 1"), new Hand(cardDatabase.cards, "Player 2")];

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
					this.hands[0].restartTurno();

					// Restar Stats Hand 2
					this.hands[1].restartTurno();
				}

				// If Everybody Plays . Plays Player 1
				if (this.hands[0].status === 'playing' && this.hands[1].status === 'playing')
					this.hands[0].turno(input, output, this.hands[1]);
				else
					if (this.hands[0].status === 'next' && this.hands[1].status === 'playing')
						this.hands[1].turno(input, output, this.hands[0]);

			}

	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };