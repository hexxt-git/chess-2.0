settings = eval(localStorage.getItem('settings'))
players = eval(localStorage.getItem('players'))
team1 = eval(localStorage.getItem('team1'))
team2 = eval(localStorage.getItem('team2'))
team3 = eval(localStorage.getItem('team3'))
team4 = eval(localStorage.getItem('team4'))

function updateCards(board, turn){
    $('side1').innerHTML=''
    $('side2').innerHTML=''
    for (let i = 1 ; i <= 4 ; i++){
        if (players['enable'+i]){
            $('side'+Math.ceil(i/2)).innerHTML += `
            <div class="player-info${turn==i?'-selected':''}">
                <div class="player-name${turn==i?'-selected':''}">${players['name'+i]}</div>
                    <div class="player-stats">
                        pieces taken: <span class="pieces-taken"></span><br>
                        pieces left: <span class="pieces-left"></span><br>
                        undos left: <span class="undos-left"></span><br>
                        skips left: <span class="skips-left"></span>
                    </div>
                <div class="buttons${turn==i?'-selected':''}">
                    <div>UNDO</div>
                    <div>SKIP</div>
                </div>
            </div>`
        }
    }
}

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
        if(pieces[team1[0][i]]!=undefined){
            board.push(new pieces[team2[0][i]].constructor( boardSize+2, boardSize-i+1, players.name2))
        }
        if(pieces[team1[1][i]]!=undefined){
            board.push(new pieces[team2[1][i]].constructor( boardSize+3, boardSize-i+1, players.name2))
        }
    }
}
// team 3
if (players.enable3){
    for( let i = 0 ; i < boardSize ; i++ ){
        if(pieces[team1[0][i]]!=undefined){
            board.push(new pieces[team1[0][i]].constructor( i+2, boardSize+2, players.name3))
        }
        if(pieces[team1[1][i]]!=undefined){
            board.push(new pieces[team1[1][i]].constructor( i+2, boardSize+3, players.name3))
        }
    }
}
// team 4
if (players.enable4){
    for( let i = 0 ; i < boardSize ; i++ ){
        if(pieces[team1[0][i]]!=undefined){
            board.push(new pieces[team2[0][i]].constructor( 1, i+2, players.name4))
        }
        if(pieces[team1[1][i]]!=undefined){
            board.push(new pieces[team2[1][i]].constructor( 0, i+2, players.name4))
        }
    }
}
