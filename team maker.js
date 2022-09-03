settings = eval(localStorage.getItem('settings'))

pieces = [
    {
        name: 'pawn',
        cost: 1,
        sprite: './pieces/pawn.png'
    },
    {
        name: 'king',
        cost: 2,
        sprite: './pieces/king.png'
    },
    {
        name: 'rook',
        cost: 3,
        sprite: './pieces/rook.png'
    },
    {
        name: 'bishop',
        cost: 5,
        sprite: './pieces/bishop.png'
    },
    {
        name: 'knight',
        cost: 7,
        sprite: './pieces/knight.png'
    },
    {
        name: 'queen',
        cost: 10,
        sprite: './pieces/queen.png'
    },
]
for(i of pieces){
    $('pieces').innerHTML += `
    <div class="piece" id="piece-${i.name}">
        <div class="pieceImage"><img src="${i.sprite}" alt="${i.name}"></div>
        <div class="pieceName">${i.name}</div>
        <div class="pieceCost">cost: ${i.cost}</div>
    </div>`
}

size = [ 8, 10, 14, 20][settings.board]
board = [Array(size).fill(null),Array(size).fill(null)]

for(let i = 0 ; i < size*2 ; i++ ){
    $('board').innerHTML += `<div class="${i%2?"dark":"light"}">a</div>`
}