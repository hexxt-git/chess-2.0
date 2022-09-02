const NO = 0
const YES = 1
const KILL = 2

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
class Queen extends Piece{
    constructor(x, y, team){
        super(x, y, team)
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