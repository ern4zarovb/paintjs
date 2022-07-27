const canvas = document.getElementById('jsCanvas');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');



const DEFAULT_COLOR = 'black';
const CANVAS_SIZE = 700;

const ctx = canvas.getContext('2d');

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;

let painting = false;
let filling = false;


const onMouseMove = (event) => {
    x = event.offsetX;
    y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
}

const onMouseDown = (event) => {
    painting = true;
}

const handleColorClick = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
const handleRangeChange = (event) => {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}
const handleModeClick = () => {
    if(filling === true) {
        filling = false;
        mode.innerText = 'Заливка';
    } else {
        filling = true;
        mode.innerText = 'Рисование';
    }
}

const handleCanvasClick = () => {
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
const handleCM = (event) => {
    event.preventDefault();
}

const handleSaveClick = () => {
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image;
    link.download = "ern4zarovb.github.io-paintJS-image.png";
    link.click();
}


canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('contextmenu', handleCM);


Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
range.addEventListener('input', handleRangeChange);
mode.addEventListener('click', handleModeClick);
saveBtn.addEventListener('click', handleSaveClick);