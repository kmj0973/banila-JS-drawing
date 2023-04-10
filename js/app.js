const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");

const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#line-color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
//getElemetByClass는 htmlcollection을 리턴하기 떄문에 array from을 통해 array형태로 변환함.
//context = brush(붓)
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;

let isPainting =false;
let isFilling = false;
let filledColor = "white";

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX,event.offsetY);
}
function onMouseDown(event){
    isPainting = true;
}
function onMouseUp(event){
    isPainting = false;
}   
function onLineWidthChange(event) { //선 변경
    ctx.lineWidth = event.target.value;
}
function onLineColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event) {
    const colorset = event.target.dataset.color; //html에서 data-를 사용하여 dataset을 사용할 수 있게 함.
    ctx.strokeStyle = colorset;
    ctx.fillStyle = colorset;
    lineColor.value = colorset;
}
function onModeClick(event){
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "Draw";
    }
    else{
        isFilling = true;
        modeBtn.innerText = "Fill";
    }
}
function onCanvasClick(event){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        filledColor = ctx.fillStyle;
        
    }
}
function onDestroyClick(event){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.strokeStyle = "black";
    lineColor.value = "black";
}
function onEraserClick(event){
    ctx.strokeStyle = filledColor;
}
canvas.addEventListener("mousedown", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup",onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);


lineColor.addEventListener("change",onLineColorChange);
lineWidth.addEventListener("change", onLineWidthChange);

colorOptions.forEach(color => color.addEventListener("click",onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
//ctx.rect(50,50,100,100); //rect() = 사각형 선그리기 , 선의 색상이 정해지지 않았기 때문에 보이지 않음.
//rect()는 shortcut(지름길)로 간편하게 사용이 가능하다.
//하지만 이것보다 moveTo()와 lineTo()를 사용하여 좀더 창의적이게 그릴 수 있음.
//ctx.fill(); // 모두 한 경로에서 이뤄짐. stroke() 테두리만 나타내는 함수, fill() 색을 채워주는 함수

// ctx.beginPath(); // 이전에 그려진 것들과 단절됨. context 새로운 경로 시작하기.
// ctx.rect(350,350,100,100);
// ctx.fillStyle = "red";

// ctx.moveTo(50,50); //브러쉬를 움직이는 함수
// ctx.lineTo(150,50); //브러쉬의 시작점으로부터 x,y 까지의 선을 그리는 함수, (브러쉬이동)브러쉬의 좌표가 변경됨.
// ctx.lineTo(150,150);
// ctx.lineTo(50,150);
// ctx.lineTo(50,50);
// ctx.fill();

