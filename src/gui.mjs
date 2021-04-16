
class GUI {

    // Constructor
    constructor() {
    }

    // Init Gui
    initGUI(game) {

        // Canvas
        let canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 0;
        canvas.height = 0;
        document.getElementsByTagName('body')[0].appendChild(canvas);

        // Output
        let output = document.createElement("div");
        output.id = "output";
        output.innerHTML = "Bienvenid@ ! Escribe start y pulsa enter para empezar ! Para jugar escribe el comando numérico y presiona enter.";
        document.getElementsByTagName('body')[0].appendChild(output);

        // Input
        let form = document.createElement("form");
        form.id = "form";
        let input = document.createElement("input");
        input.id = "input";
        form.appendChild(input);
        document.getElementsByTagName('body')[0].appendChild(form);

        // Load Website
        for (let i = 0; i <= 12; i++) {
            let img = document.createElement("img");
            img.id = "img_" + i;
            img.src = "img/" + i + ".png";

            // Add Image to Body
            document.getElementsByTagName('body')[0].appendChild(img);
        }

        // Set Events Input
        document.getElementById('form').addEventListener("submit", function (event) {
            event.preventDefault();
            game.sendCommand(document.getElementById("input").value, document.getElementById('output'));
            document.getElementById('input').value = '';
        });

    }

    clean() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

export { GUI };