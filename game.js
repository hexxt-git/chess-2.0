settings = eval(localStorage.getItem('settings'))
players = eval(localStorage.getItem('players'))
team1 = eval(localStorage.getItem('team1'))
team2 = eval(localStorage.getItem('team2'))
team3 = eval(localStorage.getItem('team3'))
team4 = eval(localStorage.getItem('team4'))

function updateCards(){
    $('side0').innerHTML=''
    $('side1').innerHTML=''
    for (let i = 1 ; i <= 4 ; i++){
        left = 0
        for( let j in board ) left += board[j].team == i ? 1 : 0
        if (players['enable'+i]){
            $('side'+(i==1|i==4?0:1)).innerHTML += `
            <div class="player-info${turn==i-1?'-selected':''}">
                <div class="player-name${turn==i-1?'-selected':''}">${players['name'+i]}</div>
                <div class="player-stats">
                    pieces taken: <span class="pieces-taken">${piecesTaken[i-1]}</span><br>
                    pieces left: <span class="pieces-left">${left}</span><br>
                    undos left: <span class="undos-left">${undos[i-1]}</span><br>
                    skips left: <span class="skips-left">${skips[i-1]}</span>
                </div>
                <div class="buttons${turn==i-1?'-selected':''}">
                    <div id="undo-${i}">UNDO</div>
                    <div id="skip-${i}">SKIP</div>
                </div>
            </div>`
        } else {
            $('side'+(i==1|i==4?0:1)).innerHTML += `
            <div class="player-info${turn==i-1?'-selected':''}"></div>
            `
        }
    }
    for (let i = 1 ; i <= 4 ; i++){
        if(!players['enable'+i]) continue
        $('skip-'+i).addEventListener('click',()=>{
            if(skips[i-1] > 0){
                if( turn+1 == i ){
                    write(players['name'+i]+' skipped his move')
                    skips[i-1] = skips[i-1] - 1
                    turn += 1
                    turnsPLayed += 1
                    state = NEWMOVE
                    updatePieces()
                    updateCards()
                }
            }
        })
        $('undo-'+i).addEventListener('click',()=>{
            if(undos[i-1] > 0){
                if(turn+1 == i){
                    if(undoTo.length >= 1){
                        if(board!=undoTo[undoTo.length-1][0]){
                            write(players['name'+i]+' undid the last move')
                            undos[i-1] = undos[i-1] - 1
                            board = undoTo[undoTo.length-1][0]
                            for(let j = 0; j < 4; j++) piecesTaken[j] = undoTo[undoTo.length-1][1][j]
                            //turn = undoTo[undoTo.length-1][2]
                            for(let i of [1,2,3,4]) players['enable'+i] = undoTo[undoTo.length-1][3][i-1]
                            undoTo.pop()
                            state = NEWMOVE
                            updatePieces()
                            updateCards()
                        }
                    } else {
                        error('nothing to go back to')
                    }
                }
            }
        })
    }
    updateHeader()
}
function updateHeader(){
    $('header').innerHTML = `
    <div>turn: <span style="color:${players['color'+(turn+1)]};padding-left:6px;">${players['name'+(turn+1)]}</span></div>
    <div>time: ${timers[turn]}${timers[turn]%1==0?'.0':''}s</div>
    <div>turns: ${settings.max_turns-turnsPLayed}</div>
    `
}
function updatePieces(){
    test4win()
    $('overlay').innerHTML = ''
    for(let i = 0 ; i < board.length ; i++){
        let color = [0,0,0]
        color = players['color'+board[i].team]
        $('overlay').innerHTML += `
        <div
            id="piece-${i}"
            style="
                position: fixed;
                left: ${$('canvas').offsetLeft + board[i].x*size}px;
                top:  ${$('canvas').offsetTop  + board[i].y*size}px;
                cursor: ${ board[i].team-1 == turn ? 'pointer' : 'auto'};
                mask: url(${board[i].src});
                mask-size: cover;
                -webkit-mask: url(${board[i].src});
                -webkit-mask-size: cover;
            "
        >
            <div style="
                background-color: ${color};
                width: ${size}px;
                height: ${size}px;
                ">
                    <div style="
                        background-color: #444;
                        width: ${size}px;
                        height: ${size}px;
                        opacity: ${board[i].team-1==turn?'0%':'70%'};
                    "></div>
                </div>
        </div>`
    }
    for(let i = 0 ; i < board.length ; i++){
        $('piece-'+i).addEventListener('click',()=>{
            if(board[i].team-1 == turn ){
                selected = i
                state = MOVING
            }
            updatePieces(board)
        })
    }
    let moves = 0
    if (state == MOVING){
        for(let x = 0 ; x < boardSize+4 ; x++){
            for(let y = 0 ; y < boardSize+4 ; y++){
                if(x<=1&y<=1) continue
                if(x-2>=boardSize&y<=1) continue
                if(x-2>=boardSize&y-2>=boardSize) continue
                if(x<=1&y-2>=boardSize) continue
                let canMove = board[selected].canMove(board, x, y)
                if( canMove == NO ) continue
                moves++
                $('overlay').innerHTML += `
                    <div style="
                        position: fixed;
                        top:  ${$('canvas').offsetTop  + y*size + 5}px;
                        left: ${$('canvas').offsetLeft + x*size + 5}px;
                        width: ${size-10}px;
                        height: ${size-10}px;
                        background: ${canMove==1?'#eee8':'#c337'};
                        border-radius: 10%;
                        filter: drop-shadow( 0px 0px 2px ${canMove==1?'#bbbb':'#c33c'});
                        cursor: pointer;
                        "
                        id="move-${moves}"
                        class="{x:${x},y:${y},move:${canMove}}"
                    ></div>
                `
            }
        }
        for(let i = 0 ; i < board.length ; i++){
            $('piece-'+i).addEventListener('click',()=>{
                if(board[i].team-1 == turn){
                    selected = i
                    state = MOVING
                }
                updatePieces(board)
            })
        }
        for(let i = 1 ; i <= moves ; i++){
            $('move-'+i).addEventListener('click',()=>{
                addUndo()
                let move = eval('('+$('move-'+i).className+')')
                write(players['name'+(turn+1)]+': '+board[selected].constructor.name+' from (x: '+board[selected].x+', y: '+board[selected].y+') to (x: '+move.x+', y: '+move.y+')')
                state = NEWMOVE
                if ( move.move == KILL ){
                    index = pieceAtIndex(board, move.x, move.y)
                    if(index < selected){
                        selected -= 1
                    }
                    board.splice(index, 1)
                    piecesTaken[turn%4] += 1
                }
                turn += 1
                turnsPLayed += 1

                for( let m = 0 ; m < 5 ; m++ ){
                    if( turn==0 & !players.enable1 ) turn += 1
                    if( turn==1 & !players.enable2 ) turn += 1
                    if( turn==2 & !players.enable3 ) turn += 1
                    if( turn==3 & !players.enable4 ) turn = 0
                    if( turn==4 ) turn = 0
                }

                board[selected].x = move.x
                board[selected].y = move.y
                updatePieces()
                updateCards()
            })
        }
    }
    
    for( let m = 0 ; m < 5 ; m++ ){
        if( turn==0 & !players.enable1 ) turn += 1
        if( turn==1 & !players.enable2 ) turn += 1
        if( turn==2 & !players.enable3 ) turn += 1
        if( turn==3 & !players.enable4 ) turn = 0
        if( turn==4 ) turn = 0
    }

    let save = '[['
    for( i in board ){
        save += 'new '+board[i].constructor.name+'('+board[i].x+','+board[i].y+','+board[i].team+'),'
    }
    save += '],'
    save += turn+','
    save += turnsPLayed+','
    save += `[ ${piecesTaken[0]}, ${piecesTaken[1]}, ${piecesTaken[2]}, ${piecesTaken[3]} ],`
    save += `[ ${timers[0]}, ${timers[1]}, ${timers[2]}, ${timers[3]} ],`
    save += `[ ${skips[0]}, ${skips[1]}, ${skips[2]}, ${skips[3]} ],`
    save += `[ ${undos[0]}, ${undos[1]}, ${undos[2]}, ${undos[3]} ]`

    save += ']'

    localStorage.setItem('continue', save)
}
function test4win(){

    for (let i=1 ; i<=4 ; i++){
        let pieces = 0
        for ( let j in board ) pieces += board[j].team == i ? 1 : 0
        if ( pieces == 0 & players['enable'+i] ){
            players['enable'+i] = false
            write(players['name'+i]+' was eliminated')
        }
    }
    
    if( settings.win_condition == 0){
        for (let i=1 ; i<=4 ; i++){
            let kings = 0
            for ( let j in board ) kings += board[j].team == i & board[j].constructor.name == 'King' ? 1 : 0
            if ( kings == 0 & players['enable'+i] ){
                players['enable'+i] = false
                write(players['name'+i]+' was eliminated')
            }
        }
    }

    for (let i=0 ; i < 4 ; i++){
        if(timers[i] <= 2){
            players['enable'+(i+1)] = false
            write(players['name'+(i+1)]+' was eliminated')
        }
    }
    
    let copy = board.filter( i => players['enable'+i.team])
    board = copy

    if(settings.max_turns-turnsPLayed <= 0){
        localStorage.setItem('draw', 'true')
        window.location = './win.html'
    }

    let enabled = []
    for (let i=1 ; i<=4 ; i++){
        if(players['enable'+i]){
            enabled.push(i)
        }
    }
    if(enabled.length <= 1){
        localStorage.setItem('draw', 'false')
        localStorage.setItem('winner', players['name'+enabled[0]])
        window.location = './win.html'
    }
}
function fix(){
    setTimeout(()=>{
        requestAnimationFrame(fix)
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        size = container.clientHeight / (boardSize+4)
        checker( c,size)
        updatePieces()
        updateCards()
    }, 2000)
}
function updateTimers(){
    setInterval(()=>{
        timers[turn] -= 0.1
        timers[turn] = Math.floor(timers[turn] * 10) / 10
        updateHeader()
    },100)
}
function addUndo(){
    let currentState = []
    let currentBoard = []
    let enables = []
    for(let i of [1,2,3,4]) enables.push(players['enable'+i])
    for(let i in board) currentBoard.push(new board[i].constructor(board[i].x,board[i].y,board[i].team))
    currentState.push(currentBoard)
    currentState.push(eval(JSON.stringify(piecesTaken)))
    currentState.push(turn)
    currentState.push(enables)
    undoTo.push(currentState)
    while(undoTo.length > undos.reduce((sum, a) => sum + a, 0)) board.shift()
}

const boardSize = [ 8, 10, 14, 20][settings.board]
let board = []
let turn = 0
let turnsPLayed = 0
let piecesTaken = [0, 0, 0, 0]
let undos = [settings.undos, settings.undos, settings.undos, settings.undos]
let skips = [settings.skips, settings.skips, settings.skips, settings.skips]
let timers = [settings.max_time, settings.max_time, settings.max_time, settings.max_time]

if(localStorage.getItem('continue')=='false'|localStorage.getItem('continue')==null){
    // team 1
    if (players.enable1){
        for( let i = 0 ; i < boardSize ; i++ ){
            if(pieces[team1[0][i]]!=undefined){
                board.push(new pieces[team1[0][i]].constructor( boardSize-i+1, 1, 1))
            }
            if(pieces[team1[1][i]]!=undefined){
                board.push(new pieces[team1[1][i]].constructor( boardSize-i+1, 0, 1))
            }
        }
    }
    // team 2
    if (players.enable2){
        for( let i = 0 ; i < boardSize ; i++ ){
            if(pieces[team2[0][i]]!=undefined){
                board.push(new pieces[team2[0][i]].constructor( boardSize+2, boardSize-i+1, 2))
            }
            if(pieces[team2[1][i]]!=undefined){
                board.push(new pieces[team2[1][i]].constructor( boardSize+3, boardSize-i+1, 2))
            }
        }
    }
    // team 3
    if (players.enable3){
        for( let i = 0 ; i < boardSize ; i++ ){
            if(pieces[team3[0][i]]!=undefined){
                board.push(new pieces[team3[0][i]].constructor( i+2, boardSize+2, 3))
            }
            if(pieces[team3[1][i]]!=undefined){
                board.push(new pieces[team3[1][i]].constructor( i+2, boardSize+3, 3))
            }
        }
    }
    // team 4
    if (players.enable4){
        for( let i = 0 ; i < boardSize ; i++ ){
            if(pieces[team4[0][i]]!=undefined){
                board.push(new pieces[team4[0][i]].constructor( 1, i+2, 4))
            }
            if(pieces[team4[1][i]]!=undefined){
                board.push(new pieces[team4[1][i]].constructor( 0, i+2, 4))
            }
        }
    }
} else {
    data = eval(localStorage.getItem('continue'))
    board = data[0]
    turn = data[1]
    turnsPLayed = data[2]
    piecesTaken = eval(data[3])
    timers = eval(data[4])
    skips = eval(data[5])
    undos = eval(data[6])
}

for( let m = 0 ; m < 5 ; m++ ){
    if( turn==0 & !players.enable1 ) turn += 1
    if( turn==1 & !players.enable2 ) turn += 1
    if( turn==2 & !players.enable3 ) turn += 1
    if( turn==3 & !players.enable4 ) turn = 0
    if( turn==4 ) turn = 0
}

canvas = $('canvas')
container = $('containerB')
canvas.width = container.clientWidth
canvas.height = container.clientHeight
size = container.clientHeight / (boardSize+4)

let c = canvas.getContext('2d')

let state = NEWMOVE
let selected = 0

let undoTo = []

checker(c,size)
updatePieces()
updateCards()
fix()
updateTimers()
