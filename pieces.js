class Piece{
    constructor(x, y, team){
        this.x = x
        this.y = y
        this.team = team
    }
    talk(){
        write(`I'm a ${this.constructor.name} at ${this.x}, ${this.y} from team ${this.team}`)
    }
}
class Pawn extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/pawn.png'
    }
    canMove(board, x, y){
        if ( Math.abs(this.x-x) == 1 && Math.abs(this.y-y) == 1 ){
            if (pieceAt(board, x, y) == null){
                return YES
            }
            if (pieceAt(board, x, y).team != this.team){
                return KILL
            }
            if (pieceAt(board, x, y).team == this.team){
                return NO
            }
        }
        return NO
    }
}
class Knight extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/knight.png'
    }
    canMove(board, x, y){
        if ((this.x == x+1 & this.y == y+2) | (this.x == x+1 & this.y == y-2) | (this.x == x-1 & this.y == y+2) | (this.x == x-1 & this.y == y-2)|
        (this.x == x+2 & this.y == y+1) | (this.x == x+2 & this.y == y-1) | (this.x == x-2 & this.y == y+1) | (this.x == x-2 & this.y == y-1)){
            if (pieceAt(board, x, y) == null){
                return YES
            }
            if (pieceAt(board, x, y).team != this.team){
                return KILL
            }
            if (pieceAt(board, x, y).team == this.team){
                return NO
            }
        }
        return NO
    }
}
class Rook extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/rook.png'
    }
    canMove(board, x, y){
        if (this.x == x | this.y == y){
            let line = getLine(this.x, this.y, x, y)
            line.shift()
            line.pop()
            for(let i in line){
                if(pieceAt(board, line[i].x, line[i].y)!=null) return NO
            }
            if(pieceAt(board, x, y) == null){
                return YES
            }
            if(pieceAt(board, x, y).team != this.team){
                return KILL
            }
            if(pieceAt(board, x, y).team == this.team){
                return NO
            }
        }
        return NO
    }
}
class Bishop extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/bishop.png'
    }
    canMove(board, x, y){
        if (Math.abs(this.x-x) == Math.abs(this.y-y)){
            let line = getLine(this.x, this.y, x, y)
            line.shift()
            line.pop()
            for(let i in line){
                if(pieceAt(board, line[i].x, line[i].y)!=null) return NO
            }
            if(pieceAt(board, x, y) == null){
                return YES
            }
            if(pieceAt(board, x, y).team != this.team){
                return KILL
            }
            if(pieceAt(board, x, y).team == this.team){
                return NO
            }
        }
        return NO
    }
}
class Ninja extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/Ninja.png'
    }
    canMove(board, x, y){
        if (pieceAt(board, x, y) == null) return YES
        return NO
    }
}

class Queen extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/queen.png'
    }
    canMove(board, x, y){
        if (this.x == x | this.y == y | Math.abs(this.x-x) == Math.abs(this.y-y)){
            let line = getLine(this.x, this.y, x, y)
            line.shift()
            line.pop()
            for(let i in line){
                if(pieceAt(board, line[i].x, line[i].y)!=null) return NO
            }
            if(pieceAt(board, x, y) == null){
                return YES
            }
            if(pieceAt(board, x, y).team != this.team){
                return KILL
            }
            if(pieceAt(board, x, y).team == this.team){
                return NO
            }
        }
        return NO
    }
}
class King extends Piece{
    constructor(x, y, team){
        super(x, y, team)
        this.src = './playing-pieces/king.png'
    }
    canMove(board, x, y){
        if ( Math.abs(this.x-x) <= 1 && Math.abs(this.y-y) <= 1 ){
            if (pieceAt(board, x, y) == null){
                return YES
            }
            if (pieceAt(board, x, y).team != this.team){
                return KILL
            }
            if (pieceAt(board, x, y).team == this.team){
                return NO
            }
        }
        return NO
    }
}

const pieces = [
    {
        name: 'pawn',
        cost: 1,
        src: './pieces/pawn.png',
        constructor: Pawn,
        discription: 'cheapest chess piece, can only move one diagonal step.'
    },
    {
        name: 'king',
        cost: 2,
        src: './pieces/king.png',
        constructor: King,
        discription: 'you need at least one alive when the win condition is set to King, can move one step in any direction.'
    },
    {
        name: 'rook',
        cost: 3,
        src: './pieces/rook.png',
        constructor: Rook,
        discription: 'classic chess Rook, can only move horizontaly and vertically.'
    },
    {
        name: 'bishop',
        cost: 5,
        src: './pieces/bishop.png',
        constructor: Bishop,
        discription: 'classic chess Bishop, can only move diagonally.'
    },
    {
        name: 'knight',
        cost: 7,
        src: './pieces/knight.png',
        constructor: Knight,
        discription: 'classic chess Knight, moves two steps in one direction and one in the other, can also jump over pieces.'
    },
    {
        name: 'queen',
        cost: 10,
        src: './pieces/queen.png',
        constructor: Queen,
        discription: 'classic chess Queen, can move in any direction.'
    },
    {
        name: 'Ninja',
        cost: 15,
        src: './pieces/Ninja.png',
        constructor: Ninja,
        discription: 'can teleport anywhere but cannot kill any pieces making it the ultimate defence.'
    },
]