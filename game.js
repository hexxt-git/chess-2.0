updateCards(board,1)

canvas = $('canvas')
container = $('containerB')
canvas.width = container.clientWidth
canvas.height = container.clientHeight
size = container.clientHeight / (boardSize+4)

c = canvas.getContext('2d')

checker(c,size)

let x = 2
let y = 3

for(i in board){
    $('pieces').innerHTML += `
    <img
        src="${board[i].src}"
        style="
            filter: invert(1);
            width: ${size}px;
            height: ${size}px;
            position: fixed;
            top: ${$('canvas').offsetTop + board[i].y*size}px;
            left: ${$('canvas').offsetLeft + board[i].x*size}px;
            cursor: pointer;
        "
    >
    `
}