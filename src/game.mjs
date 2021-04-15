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

	// To Draw Cards to User
	draw(hands) {

		// Get Canvas
		var canvas = document.getElementById("canvas");
		canvas.width = (245 * 30) * 0.8;
		canvas.height = ((342 * 2) * 0.8) + 90;
		var ctx = canvas.getContext("2d");
		let column = 0;
		let row = 0;
		let extra = 0;

		// Font Size
		ctx.font = "12px Arial Black";

		// Get Hands
		hands.forEach(
			hand => {
				// Get All Pokemon Cards in Hand
				hand.cards.filter(card => (card.status === 'fight' || card.status === 'dock' || card.status === 'hand'))
					.sort((a, b) => b.order() - a.order())
					.forEach(card => {

						// Let Informative text
						let text = card.status;

						// Get Image
						var image = document.getElementById('img_' + card.image);

						// Card Image
						ctx.drawImage(image, (245 * 0.80) * (column), ((342 * 0.80) * row) + extra, (245 * 0.80), (342 * 0.80));

						// Info Text
						if (card.type === 'pokemon') {
							// Add Info Text
							text += " / " + card.vitality_now + "PS / ";

							// Value Energy
							let energy = "";

							// Check Fire
							if (card.energy.filter((v) => v === 'fire').length > 0) energy += 'Fire x' + card.energy.filter((v) => v === 'fire').length + " / ";

							// Check Electric
							if (card.energy.filter((v) => v === 'electric').length > 0) energy += 'Elec x' + card.energy.filter((v) => v === 'electric').length + " / ";

							// Check Fight
							if (card.energy.filter((v) => v === 'fight').length > 0) energy += 'Fight x' + card.energy.filter((v) => v === 'fight').length + " / ";

							// Draw Text
							ctx.fillText(energy.substring(0, energy.length - 2), (245 * 0.80) * (column), ((342 * 0.80) * (row + 1)) + extra + 30);

						}

						// Draw Text
						ctx.fillText(text, (245 * 0.80) * (column), ((342 * 0.80) * (row + 1)) + extra + 13);


						// Next Column
						column++;

					});

				// Separación
				ctx.beginPath();
				ctx.moveTo(0, 315);
				ctx.lineTo(canvas.width, 315);
				ctx.stroke();

				// Next Row
				row++;
				column = 0;
				extra = 50;

			}

		);


	}

}

// Create Game
let game = new Game(new GUI());

// Exporto módulo
export { game };