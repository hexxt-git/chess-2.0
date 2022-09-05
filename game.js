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
                    `/*
                    undos left: <span class="undos-left">${undos[i-1]}</span><br>
                    skips left: <span class="skips-left">${skips[i-1]}</span>
                </div>
                <div class="buttons${turn==i-1?'-selected':''}">
                    <div>UNDO</div>
                    <div>SKIP</div>
                </div>
            </div>`*/
        } else {
            $('side'+(i==1|i==4?0:1)).innerHTML += `
            <div class="player-info${turn==i-1?'-selected':''}"></div>
            
            `
        }
    }
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
                filter:
                    grayscale(${board[i].team-1 == turn? 0: 30}%)
                ;
                "></div>
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
                let move = eval('('+$('move-'+i).className+')')
                console.log(players['name'+(turn+1)]+': '+board[selected].constructor.name+' to (x: '+move.x+', y: '+move.y+')')
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
    save += '],'+turn+','
    save += `[ ${piecesTaken[0]}, ${piecesTaken[1]}, ${piecesTaken[2]}, ${piecesTaken[3]} ]]`
    localStorage.setItem('continue', save)
}
function test4win(){
    for (let i=1 ; i<=4 ; i++){
        let pieces = 0
        for ( let j in board ) pieces += board[j].team == i ? 1 : 0
        if ( pieces == 0 & players['enable'+i] ){
            players['enable'+i] = false
            console.log(players['name'+i]+' was eliminated')
        }
    }
    if( settings.win_condition == 0){
        for (let i=1 ; i<=4 ; i++){
            let kings = 0
            for ( let j in board ) kings += board[j].team == i & board[j].constructor.name == 'King' ? 1 : 0
            if ( kings == 0 & players['enable'+i] ){
                players['enable'+i] = false
                console.log(players['name'+i]+' was eliminated')
            }
        }
    }
    copy = board.filter( p => players['enable'+p.team])
    board = copy
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

const boardSize = [ 8, 10, 14, 20][settings.board]
let board = []
let turn = 0
let piecesTaken = [0, 0, 0, 0]
let undos = [settings.undos, settings.undos, settings.undos, settings.undos]
let skips = [settings.skips, settings.skips, settings.skips, settings.skips]

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
    console.log(data)
    board = data[0]
    turn = data[1]
    piecesTaken = eval(data[2])
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


checker(c,size)
updatePieces()
updateCards()
fix()
