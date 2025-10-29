///////////////////////////////////////////main gameplay loop
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let y = 10;
let x = 10;
let speed = 1;
function gameLoop(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, y, 50, 50); 
    if(y+50 >= canvas.height){
        y = canvas.height - 50
        }
    else{
        y+= speed
    }
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);


////////////////////////////////////lateral movement and speed up
function arrowMove(e) {
    if (e.key === "ArrowLeft" && x > 0) {
        x-=10;
    }
    else if(e.key === "ArrowRight" && x + 50 < canvas.width) {
        x+= 10;
    }
    if (e.key === "ArrowDown") {
        speed = 5;
    }
}

function speedReset (e) {
    if (e.key === "ArrowDown") {
        speed = 1;
    }
}
addEventListener("keydown", arrowMove);
addEventListener("keyup", speedReset);


