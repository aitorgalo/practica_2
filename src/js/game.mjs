// Importo módulo con las cartas
import { Hand , cardDatabase } from './hand.mjs';

class Game
{
	// Crear mano de juego

	constructor()
	{
		this.initGame();
	}
	
	sendCommand(input , display)
	{
	
	switch (input) {
	case "count":  display.innerHTML = this.hand_player.cards.length; break;
	case "remove": this.hand_player.remove(); break;
	case "restart": this.initGame();
	
	
	default:
	
	
	
	}
	
	
	
	}
	
	// Give Cards to users again
	initGame()
	{
	 this.hand_player = new Hand(cardDatabase);
	 this.hand_machine = new Hand(cardDatabase);
	}
		
}

let game = new Game();

// Exporto módulo
export { game };