settings = eval(localStorage.getItem('settings'))
players = eval(localStorage.getItem('players'))
team1 = eval(localStorage.getItem('team1'))
team2 = eval(localStorage.getItem('team2'))
team3 = eval(localStorage.getItem('team3'))
team4 = eval(localStorage.getItem('team4'))

function updateCards(board, turn, piecesTaken, undos, skips){
    $('side1').innerHTML=''
    $('side2').innerHTML=''
    for (let i = 1 ; i <= 4 ; i++){
        left = 0
        for( let j in board ) left += board[j].team == 'name'+i ? 1 : 0
        if (players['enable'+i]){
            $('side'+((i+1)%2+1)).innerHTML += `
            <div class="player-info${turn==i?'-selected':''}">
                <div class="player-name${turn==i?'-selected':''}">${players['name'+i]}</div>
                <div class="player-stats">
                    pieces taken: <span class="pieces-taken">${piecesTaken[i-1]}</span><br>
                    pieces left: <span class="pieces-left">${left}</span><br>
                    undos left: <span class="undos-left">${undos[i-1]}</span><br>
                    skips left: <span class="skips-left">${skips[i-1]}</span>
                </div>
                <div class="buttons${turn==i?'-selected':''}">
                    <div>UNDO</div>
                    <div>SKIP</div>
                </div>
            </div>`
        }
    }
}
function updatePieces(board){
    $('pieces').innerHTML = ''
    for(let i = 0 ; i < board.length ; i++){
        let color = [0,0,0]
        if(board[i].team == players.name1) color = hexToHSL(players.color1)
        if(board[i].team == players.name2) color = hexToHSL(players.color2)
        if(board[i].team == players.name3) color = hexToHSL(players.color3)
        if(board[i].team == players.name4) color = hexToHSL(players.color4)
        $('pieces').innerHTML += `
        <img
            src="${board[i].src}"
            id="piece-${i}"
            style="
                filter: 
                    hue-rotate(${color[0]}deg)
                    saturate(${color[1]}%)
                    brightness(${Math.pow(color[2],2)/10}%)
                    ${state==MOVING&i==selected?'drop-shadow( 0px 0px 3px #fff)':''}
                ;
                width: ${size}px;
                height: ${size}px;
                position: fixed;
                left: ${$('canvas').offsetLeft + board[i].x*size}px;
                top:  ${$('canvas').offsetTop  + board[i].y*size}px;
                cursor: ${ state == NEWMOVE ? 'pointer' : ''};
            "
        />`
    }
    if (state == NEWMOVE){
        for(let i = 0 ; i < board.length ; i++){
            $('piece-'+i).addEventListener('click',()=>{
                    selected = i
                    state = MOVING
                updatePieces(board)
            })
        }
    }
    if (state == MOVING){
        let moves = 0
        for(let x = 0 ; x < boardSize+4 ; x++){
            for(let y = 0 ; y < boardSize+4 ; y++){
                if(x<=1&y<=1) continue
                if(x-2>=boardSize&y<=1) continue
                if(x-2>=boardSize&y-2>=boardSize) continue
                if(x<=1&y-2>=boardSize) continue
                let canMove = board[selected].canMove(board, x, y)
                if( canMove == NO ) continue
                moves++
                $('pieces').innerHTML += `
                    <div style="
                        position: fixed;
                        top:  ${$('canvas').offsetTop  + y*size + 5}px;
                        left: ${$('canvas').offsetLeft + x*size + 5}px;
                        width: ${size-10}px;
                        height: ${size-10}px;
                        background: ${canMove==1?'#eee8':'#c337'};
                        border-radius: 100%;
                        filter: drop-shadow( 0px 0px 2px ${canMove==1?'#bbbb':'#c33c'});
                        cursor: pointer;
                    "
                        id="move-${moves}"
                        class="{x:${x},y:${y},move:${canMove}}"
                    ></div>
                `
            }
        }
        for(let i = 0 ; i < moves ; i++){
            
        }
    }
}

const participants = (players.enable1?1:0) + (players.enable2?1:0) + (players.enable3?1:0) + (players.enable4?1:0)

const boardSize = [ 8, 10, 14, 20][settings.board]
board = []

// team 1
if (players.enable1){
    for( let i = 0 ; i < boardSize ; i++ ){
        if(pieces[team1[0][i]]!=undefined){
            board.push(new pieces[team1[0][i]].constructor( boardSize-i+1, 1, players.name1))
        }
        if(pieces[team1[1][i]]!=undefined){
            board.push(new pieces[team1[1][i]].constructor( boardSize-i+1, 0, players.name1))
        }
    }
}
// team 2
if (players.enable2){
    for( let i = 0 ; i < boardSize ; i++ ){
        if(pieces[team2[0][i]]!=undefined){
            board.push(new pieces[team2[0][i]].constructor( boardSize+2, boardSize-i+1, players.name2))
        }
        if(pieces[team2[1][i]]!=undefined){
            board.push(new pieces[team2[1][i]].constructor( boardSize+3, boardSize-i+1, players.name2))
        }
    }
}
// team 3
if (players.enable3){
    for( let i = 0 ; i < boardSize ; i++ ){
        if(pieces[team3[0][i]]!=undefined){
            board.push(new pieces[team3[0][i]].constructor( i+2, boardSize+2, players.name3))
        }
        if(pieces[team3[1][i]]!=undefined){
            board.push(new pieces[team3[1][i]].constructor( i+2, boardSize+3, players.name3))
        }
    }
}
// team 4
if (players.enable4){
    for( let i = 0 ; i < boardSize ; i++ ){
        if(pieces[team4[0][i]]!=undefined){
            board.push(new pieces[team4[0][i]].constructor( 1, i+2, players.name4))
        }
        if(pieces[team4[1][i]]!=undefined){
            board.push(new pieces[team4[1][i]].constructor( 0, i+2, players.name4))
        }
    }
}
