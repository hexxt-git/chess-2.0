canvas = $('canvas')
container = $('containerB')
canvas.width = container.clientWidth
canvas.height = container.clientHeight
size = container.clientHeight / (boardSize+4)

c = canvas.getContext('2d')

let turn = 0
let state = NEWMOVE
let selected = 0
let piecesTaken = [0, 0, 0, 0]
let undos = [settings.undos, settings.undos, settings.undos, settings.undos]
let skips = [settings.skips, settings.skips, settings.skips, settings.skips]


checker(c,size)
updateCards(board, (turn%participants)+1, piecesTaken, undos, skips)
updatePieces(board)
