///////////////////////////////////////////////define variables and pieces
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const board = Array(40).fill(null).map(() => Array(24).fill(0));
let y = 25;
let x = 25;
let speed = 1;
let currentRotation = 0;
const square = [
    [[1,1],[1,1]],
    [[1,1],[1,1]],
    [[1,1],[1,1]],
    [[1,1],[1,1]]
];
const tShapes = [
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[1, 0, 0], [1, 1, 0], [1, 0, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 0, 1]]
    

];
 const lShapes1 = [
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],    
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],   
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[1, 1, 1], [0, 0, 1], [0, 0, 0]]

 ];

 const lShapes2 = [
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[1, 1, 1], [1, 0, 0], [0, 0, 0]]
 ];

  const zShapes1 = [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
    
 ];

 const zShapes2 = [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]]   
    
 ];

 const iShapes = [
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
    
 ];  

const pieces = [square, tShapes, lShapes1, lShapes2, zShapes1, zShapes2, iShapes];

let currentPiece = pieces[Math.floor(Math.random() * pieces.length)];

///////////////////////////////set bounds
function getBottomRow(piece) {
        for (let row = piece.length - 1; row>= 0; row--) {
            if (piece[row].some(cell => cell === 1)) {
                return row + 1;
            }
        }
        return 0;
    }
    function getRightCol (piece) {
        for (let col = piece[0].length - 1; col >=0; col--) {
            for (let row = 0; row < piece.length; row++) {
                if (piece[row][col] === 1) {
                    return col + 1;
                }
            }

        }
    }

    function getLeftCol (piece) {
        for (let col = 0; col < piece[0].length; col++) {
            for (let row = 0; row < piece.length; row++) {
                if (piece[row][col] === 1) {
                    return col;
                }
            }

        }
    }


/////////////////////main gameplay loop
function gameLoop(){    
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    for (let row = 0; row < currentPiece[currentRotation].length; row++ ) {
        for (let col = 0; col < currentPiece[currentRotation][row].length; col++) {
            if (currentPiece[currentRotation][row][col] === 1) {
                ctx.fillRect(x + col *25, y + row * 25, 25, 25);
            }
        }
    }
    for ( let row = 0; row < board.length; row++){
        for (let col = 0; col < board[row].length; col ++) {
            if (board[row][col] === 1) {
                ctx.fillRect(col * 25, row * 25, 25, 25);
            }
        }
    }
    
/////////////bottom/other block collision detection, piece locking and new piece spawn
    let wouldCollide =  false;
    let nextY = y + speed;
    for (let row = 0;row < currentPiece[currentRotation].length; row++) {
        for (let col = 0; col < currentPiece[currentRotation][row].length; col++) {
            if (currentPiece[currentRotation][row][col] === 1) {
                let boardRow = Math.floor(nextY / 25) + row;
                let boardCol = Math.floor(x / 25) + col;
                if (boardRow >= 40 ||board[boardRow][boardCol] === 1) {
                    wouldCollide = true;
                }
            }
        }
    }

    if (wouldCollide) {
        ///////////////////lock piece
        for (let row = 0; row < currentPiece[currentRotation].length; row++) {
            for (let col = 0; col < currentPiece[currentRotation][row].length; col++) {
                if (currentPiece[currentRotation][row][col] === 1) {
                    board[Math.floor(y/25) + row][Math.floor(x / 25) + col] = 1;
                }
            }
        }
        for (let boardRow = board.length - 1; boardRow >= 0; boardRow--) {
            if (board[boardRow].every(cell => cell === 1)) {
                board.splice(boardRow, 1);
                board.unshift(Array(24).fill(0));
                boardRow++;
            }
        }
         ///////////////////new piece
        currentPiece = pieces[Math.floor(Math.random() * pieces.length)];
        currentRotation = 0;
        x = 25;
        y = 25;
    } else {
        y += speed;
    }          

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);


////////////////////////lateral movement, rotation, and speed up
function arrowMove(e) {
    console.log('x:', x, 'leftCol:', getLeftCol(currentPiece[currentRotation]), 'check:', x + (getLeftCol(currentPiece[currentRotation]) * 25))

    if (e.key === "ArrowLeft" && x + (getLeftCol(currentPiece[currentRotation]) * 25) > 0) {
        x-=25;
    }
    else if(e.key === "ArrowRight" && x + (getRightCol(currentPiece[currentRotation]) * 25) < canvas.width) {
        x+= 25;
    }
    else if (e.key === "ArrowUp") {
        currentRotation = (currentRotation + 1) % 4;
    }
    if (e.key === "ArrowDown") {
        speed = 7;
    }
}

function speedReset (e) {
    if (e.key === "ArrowDown") {
        speed = 1;
    }
}
addEventListener("keydown", arrowMove);
addEventListener("keyup", speedReset);


