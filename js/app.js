

const baloons = document.querySelector("#baloons");

const fontStyleSelect = document.querySelector("#font-st");
const fontSizeSelect = document.querySelector("#font-sz");

const modeBtn = document.querySelector("#mode-btn");
const fillBtn = document.querySelector("#fill-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const saveBtn = document.querySelector("#save");
const fileBtn = document.querySelector("#file");
const textInput = document.querySelector("#text");

const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
const lineWidthNum = document.querySelector("#text1");
// const lineColor = document.querySelector("#line-color");
const fist = document.querySelector("#fist");
const colorOptions =document.querySelector(".color-option");
//getElemetByClass는 htmlcollection을 리턴하기 떄문에 array from을 통해 array형태로 변환함.
//context = brush(붓)
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// for(var i=0;i<colorOptions.length;i++){
//     colorOptions[i].style.boxShadow =`-3px 4px 5px ${colorOptions[i].dataset.color}`;
// }   
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting =false;
let isFilling = false;
let filledColor = 'white';
colorOptions.style.backgroundColor = 'black';
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
    ctx.beginPath();
}   
function onLineWidthChange(event) { //선 변경
    ctx.lineWidth = event.target.value;
    lineWidthNum.value = event.target.value;
}
function onLineWidthSubmit(event){
    const size = lineWidthNum.value;
    ctx.lineWidth = size;
    lineWidth.value = size;
}
function onLineColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    colorOptions.style.backgroundColor = event.target.value;
    colorOptions.value = event.target.value;
    // lineColor.value = event.target.value;
}
function onColorClick(event) {
    const colorset = event.target.dataset.color; //html에서 data-를 사용하여 dataset을 사용할 수 있게 함.
    console.log(colorset);
    ctx.strokeStyle = colorset;
    ctx.fillStyle = colorset;
    colorOptions.style.backgroundColor = colorset;
    colorOptions.value = colorset;
    // lineColor.value = event.target.value;
    //fist.style.webkitFilter.dropShadow="0 0 0 red";
}
function onModeClick(event){
        isFilling = false;
        ctx.fillStyle = colorOptions.style.backgroundColor;
        ctx.strokeStyle = colorOptions.style.backgroundColor;
}
function onFillClick(event){
        isFilling = true;
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
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    colorOptions.style.backgroundColor = "black";
    isFilling = false;
    modeBtn.innerText = "🩸 Draw";
    filledColor = "white";
}
function onEraserClick(event){
    ctx.strokeStyle = filledColor;
    isFilling = false;
    modeBtn.innerText = "🩸 Draw";
}
function onFileChange(event){
    const file = event.target.files[0]; // 파일 접근 //html속성에 multiple을 넣으면 여러개의 파일을 업로드할 수 있다.
    const url = URL.createObjectURL(file); // url로 변환, 유저가 업로드한 파일은 이미 브라우저 메모리 안에 있다.
    // 이 url은 브라우저 내에서만 사용이 가능함.
    const image = new Image();
    image.src = url;

    image.onload = function() {
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileBtn.value = null;
    }
}
function onDoubleClick(event) {
    const text = textInput.value;
    if(text != ""){
    ctx.save(); //ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장함.
    ctx.lineWidth = 1;
    ctx.font = "bold 58px serif";
    ctx.fillText(text, event.offsetX,event.offsetY);
    ctx.restore(); //save와 restore사이에 일어난 어떠한 수정들은 저장되지 않음.
    }
}
function onSaveClick(event){
    const url = canvas.toDataURL();//canvas안에 이미지를 url로 변환시켜줌.

    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click(); //click을 한다는 함수속성이다. fake click을 해주어 이미지를 저장하게 한다.
}
function onClickBaloons(event){
    console.log(event);
    if(event.offsetX>=42 && event.offsetX<=146 && event.offsetY>=9 && event.offsetY<=136){
        ctx.strokeStyle = "yellow";
        ctx.fillStyle = "yellow";
        colorOptions.style.backgroundColor = "yellow";
        colorOptions.value = "yellow";
    }
    if(event.offsetX>=152 && event.offsetX<=236 && event.offsetY>=86 && event.offsetY<=181){
        ctx.strokeStyle = "lawngreen";
        ctx.fillStyle = "lawngreen";
        colorOptions.style.backgroundColor = "lawngreen";
    }
    if(event.offsetX>=42 && event.offsetX<=149 && event.offsetY>=156 && event.offsetY<=291){
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "blue";
        colorOptions.style.backgroundColor = "blue";
    }
    if(event.offsetX>=157 && event.offsetX<=397 && event.offsetY>=239 && event.offsetY<=330){
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        colorOptions.style.backgroundColor = "red";
    }
}


canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("mousedown", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup",onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);


// lineColor.addEventListener("change",onLineColorChange);
lineWidth.addEventListener("change", onLineWidthChange);
lineWidthNum.addEventListener("change", onLineWidthSubmit);

colorOptions.addEventListener("change",onLineColorChange);
colorOptions.addEventListener("click",onColorClick);

fillBtn.addEventListener("click", onFillClick);
saveBtn.addEventListener("click", onSaveClick);
fileBtn.addEventListener("change", onFileChange);
modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);

baloons.addEventListener("click",onClickBaloons);
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

