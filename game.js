updateCards(board,1)

canvas = $('canvas')
container = $('containerB')
canvas.width = container.clientWidth
canvas.height = container.clientHeight

size = container.clientHeight / (boardSize+4)

c = canvas.getContext('2d')
checker(c,size)

for(i in board){
    board[i].render(c, size)
}