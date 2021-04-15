
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
        output.innerHTML = "Bienvenid@ ! Escribe start para empezar !";
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

}

export { GUI };