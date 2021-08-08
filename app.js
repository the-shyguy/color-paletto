//Globals
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type = "range"]');
const currentHexes = document.querySelectorAll('.colors h2');
let initialColors;


//Color generator
function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
}

function randomColors() {
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        //Add color to bg
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        //Check for contrast
        checkTextcontrast(randomColor, hexText);

        //Intial colorize sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll(".sliders input");
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);

    });
}

function checkTextcontrast(color, text) {
    const luminance = chroma(color).luminance();
    if (luminance > 0.5)
        text.style.color = "#000";
    else
        text.style.color = "#fff";
}

function colorizeSliders(color, hue, brightness, saturation) {
    //Scale saturation
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);

    //Update input colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
}

randomColors();