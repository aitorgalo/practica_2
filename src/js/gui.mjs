// Init Gui
function initGUI(game) {

    // Canvas
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = 245 * 7;
    canvas.height = 342 * 2;
    document.getElementsByTagName('body')[0].appendChild(canvas);

    // Output
    let output = document.createElement("div");
    output.id = "output";
    output.innerHTML = "Empieza el juego !";
    document.getElementsByTagName('body')[0].appendChild(output);

    // Input
    let form = document.createElement("form");
    form.id = "form";
    let input = document.createElement("input");
    input.id = "input";
    form.appendChild(input);
    document.getElementsByTagName('body')[0].appendChild(form);

    // Load Website
    for (let i = 0; i <= 25; i++) {
        let img = document.createElement("img");
        img.id = "img_" + i;
        img.src = "img/" + i + ".png";
        document.getElementsByTagName('body')[0].appendChild(img);
    }

    // Set Events Input
    document.getElementById('form').addEventListener("submit", function (event) {
        event.preventDefault();
        game.sendCommand(document.getElementById("input").value, document.getElementById('output'));
        document.getElementById('input').value = '';
    });

}

export { initGUI };