// Cards in the game
var cardDatabase = [

  {
    "type": "pokemon",
    "name": "Charmander",
    "nature": "fire",
    "vitality": 60,
    "attacks": [
      {
        "name": "Arañazo",
        "cost": ["any"],
        "damage": 10
      },
      {
        "name": "Ascuas",
        "cost": ["fire", "any"],
        "damage": 30,
        "effect": "discard 1 fire"
      }
    ],
    "weakness": "water",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Charmeleon",
    "nature": "fire",
    "vitality": 80,
    "attacks": [
      {
        "name": "Cuchillada",
        "cost": ["any", "any", "any"],
        "damage": 50
      },
      {
        "name": "Lanzallamas",
        "cost": ["fire", "fire", "any"],
        "damage": 90,
        "effect": "discard 1 fire"
      }
    ],
    "weakness": "water",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Charizard",
    "nature": "fire",
    "vitality": 150,
    "hability": "all fire",
    "attacks": [
      {
        "name": "Giro Fuego",
        "cost": ["fire", "fire", "fire", "fire"],
        "damage": 200,
        "effect": "discard 3 fire"
      }
    ],
    "weakness": "water",
    "strong": "fight",
    "retire": 3
  },

  {
    "type": "pokemon",
    "name": "Growlithe",
    "nature": "fire",
    "vitality": 70,
    "attacks": [
      {
        "name": "Patada Posterior",
        "cost": ["any"],
        "damage": 10,
        "effect": "change pokemon"
      },
      {
        "name": "Llama",
        "cost": ["fire", "any"],
        "damage": 20
      }
    ],
    "weakness": "water",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Growlithe",
    "nature": "fire",
    "vitality": 70,
    "attacks": [
      {
        "name": "Patada Posterior",
        "cost": ["any"],
        "damage": 10,
        "effect": "change pokemon"
      },
      {
        "name": "Llama",
        "cost": ["fire", "any"],
        "damage": 20
      }
    ],
    "weakness": "water",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Arcanine",
    "nature": "fire",
    "vitality": 130,
    "hability": "move fire energy",
    "attacks": [
      {
        "name": "Aliento Ígneo",
        "cost": ["fire", "fire", "fire", "any"],
        "damage": 150,
        "effect": "skip 1 turn"
      }
    ],
    "weakness": "water",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Ponyta",
    "nature": "fire",
    "vitality": 60,
    "attacks": [
      {
        "name": "Patada Destrucción",
        "cost": ["any", "any"],
        "damage": 20
      },
      {
        "name": "Cola de Fuego",
        "cost": ["fire", "fire"],
        "damage": 30
      }
    ],
    "weakness": "water",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Magmar",
    "nature": "fire",
    "vitality": 80,
    "attacks": [
      {
        "name": "Puño Fuego",
        "cost": ["fire", "fire"],
        "damage": 30
      },
      {
        "name": "Lanzallamas",
        "cost": ["fire", "fire", "any"],
        "damage": 60,
        "effect": "discard 1 fire"
      }
    ],
    "weakness": "water",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Pikachu",
    "nature": "electric",
    "vitality": 60,
    "attacks": [
      {
        "name": "Roer",
        "cost": ["any"],
        "damage": 10
      },
      {
        "name": "Sacudida Atronadora",
        "cost": ["electric", "any"],
        "damage": 30,
        "effect": "random autoattack 10"
      }
    ],
    "weakness": "fight",
    "strong": "metal",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Raichu",
    "nature": "electric",
    "vitality": 100,
    "attacks": [
      {
        "name": "Vigorizar",
        "cost": ["electric"],
        "effect": "get 1 electric"
      },
      {
        "name": "Rayo Chispa",
        "cost": ["electric", "electric", "any"],
        "damage": 70,
        "effect": "discard all energy 70"
      }
    ],
    "weakness": "fight",
    "strong": "metal",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Magnemite",
    "nature": "electric",
    "vitality": 50,
    "attacks": [
      {
        "name": "Onda Trueno",
        "cost": ["electric"],
        "effect": "paralysis"
      },
      {
        "name": "Autodestrucción",
        "cost": ["electric", "any"],
        "damage": 50,
        "effect": "autoattack 50"
      }
    ],
    "weakness": "fight",
    "strong": "metal",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Magneton",
    "nature": "electric",
    "vitality": 80,
    "attacks": [
      {
        "name": "Onda Trueno",
        "cost": ["electric", "any"],
        "damage": 30,
        "effect": "random paralysis"
      },
      {
        "name": "Autodestrucción",
        "cost": ["electric", "electric", "any"],
        "damage": 80,
        "effect": "autoattack 80"
      }
    ],
    "weakness": "fight",
    "strong": "metal",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Zapdos",
    "nature": "electric",
    "vitality": 110,
    "attacks": [
      {
        "name": "Trueno",
        "cost": ["electric", "electric", "any", "any"],
        "damage": 90,
        "effect": "autoattack 90"
      },
      {
        "name": "Rayo",
        "cost": ["electric", "electric", "electric", "electric"],
        "damage": 170,
        "effect": "discard all energy"
      }
    ],
    "strong": "fight",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Diglett",
    "nature": "fight",
    "vitality": 40,
    "hability": "evade dock",
    "attacks": [
      {
        "name": "Atravesar Excavando",
        "cost": ["fight", "any"],
        "effect": "attack 30 dock"
      }
    ],
    "weak": "plant",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Dugtrio",
    "nature": "fight",
    "vitality": 90,
    "attacks": [
      {
        "name": "Cuchillada",
        "cost": ["any", "any"],
        "damage": 40
      },
      {
        "name": "Terremoto",
        "cost": ["fight", "fight", "fight"],
        "damage": 130,
        "effect": "attack 20 self dock"
      }
    ],
    "weak": "plant",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Machop",
    "nature": "fight",
    "vitality": 70,
    "attacks": [
      {
        "name": "Golpe Bis",
        "cost": ["fight", "fight"],
        "effect": "random 20 x 2"
      }
    ],
    "weak": "psychic",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Machoke",
    "nature": "fight",
    "vitality": 90,
    "attacks": [
      {
        "name": "Golpe Kárate",
        "cost": ["fight", "fight"],
        "damage": 60,
        "effect": "auto 10 less"
      },
      {
        "name": "Sumisión",
        "cost": ["fight", "fight", "fight"],
        "damage": 80,
        "effect": "auto attack 20"
      }
    ],
    "weak": "psychic",
    "retire": 2
  },

  {
    "type": "pokemon",
    "name": "Rattata",
    "nature": "normal",
    "vitality": 40,
    "hability": "delete rival tool",
    "attacks": [
      {
        "name": "Mordisco",
        "cost": ["any"],
        "damage": 10
      }
    ],
    "weak": "fight",
    "retire": 1
  },

  {
    "type": "pokemon",
    "name": "Raticate",
    "nature": "normal",
    "vitality": 60,
    "attacks": [
      {
        "name": "Triturar",
        "cost": ["any"],
        "damage": 10,
        "effect": "discard 1 energy rival"
      },
      {
        "name": "Mordisco Sombrío",
        "cost": ["any"],
        "effect": "60 x special energy"
      }
    ],
    "weak": "fight",
    "retire": 1
  },

  {
    "type": "trainer",
    "name": "Pista del Profesor Oak",
    "effect": "steal 7 end turn"
  },

  {
    "type": "trainer",
    "name": "Cambio",
    "effect": "change active dock"
  },

  {
    "type": "trainer",
    "name": "Poción",
    "effect": "heal 30"
  },

  {
    "type": "trainer",
    "name": "Cura Total",
    "effect": "heal effects"
  },

  {
    "name": "Energía Fuego",
    "type": "energy",
    "nature": "fire"
  },


  {
    "name": "Energía Electricidad",
    "type": "energy",
    "nature": "electric"
  },

  {
    "name": "Energía Lucha",
    "type": "energy",
    "nature": "fight"
  }

];

// Obtengo listado de todas las cards
export { cardDatabase };
