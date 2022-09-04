const settings = eval(localStorage.getItem('settings'))
const players = eval(localStorage.getItem('players'))

let setting = 0
if ((localStorage.getItem('teamReady1') == 'false' || localStorage.getItem('teamReady1') == null) && players.enable1 ){
    setting = 1
}
else if ((localStorage.getItem('teamReady2') == 'false' || localStorage.getItem('teamReady2') == null) && players.enable2){
    setting = 2
}
else if ((localStorage.getItem('teamReady3') == 'false' || localStorage.getItem('teamReady3') == null) && players.enable3){
    setting = 3
}
else if ((localStorage.getItem('teamReady4') == 'false' || localStorage.getItem('teamReady4') == null) && players.enable4){
    setting = 4
} else {
    window.location = "./game.html"
}
const size = [ 8, 10, 14, 20][settings.board]
let board = []
if (localStorage.getItem('team'+setting) == null){
    board = [Array(size).fill(null),Array(size).fill(null)]
} else {
    board = eval(localStorage.getItem('team'+setting))
}
$('team-name').innerHTML = players['name'+setting].toUpperCase() + ' TEAM'
$('team-name').style = `text-decoration: underline solid ${players['color'+setting]} 3px;`

let selected = 0
let maxBalance = settings.balance
let balance = 0


function update(){

    balance = 0
    for( let i = 0 ; i < size ; i++ ){
        if (board[0][i] != null){
            balance += pieces[board[0][i]].cost
        }
        if (board[1][i] != null){
            balance += pieces[board[1][i]].cost
        }
    }

    $('pieces').innerHTML = ''
    for(i in pieces){
        $('pieces').innerHTML += `
        <div class="piece" id="piece-${pieces[i].name}">
            <div class="pieceImage"><img src="${pieces[i].src}" alt="${pieces[i].name}"></div>
            <div class="pieceName" ${i==selected?'style="text-decoration: underline solid var(--accent) 2px;"':''}>${pieces[i].name}</div>
            <div class="pieceCost">cost: ${pieces[i].cost}</div>
        </div>`
    }
    for(let i = 0 ; i < pieces.length ; i++){
        $('piece-'+pieces[i].name).addEventListener('click', ()=>{
            selected = i
            update()
        })
    }

    $('line1').style = 'height:'+Math.floor($('board').clientWidth/size)+'px;'
    $('line2').style = 'height:'+Math.floor($('board').clientWidth/size)+'px;'
    
    $('line1').innerHTML = ''
    $('line2').innerHTML = ''
    for( let i = 0 ; i < size ; i++ ){
        $('line1').innerHTML += `<div class="${i%2?'light':'dark'}" id="l1-${i}"><img src="${pieces[board[0][i]]?pieces[board[0][i]].src:''}" alt="${pieces[board[0][i]]?pieces[board[0][i]].name:''}"></div>`
        $('line2').innerHTML += `<div class="${i%2?'dark':'light'}" id="l2-${i}"><img src="${pieces[board[1][i]]?pieces[board[1][i]].src:''}" alt="${pieces[board[1][i]]?pieces[board[1][i]].name:''}"></div>`
    }
    for(let i = 0 ; i < size ; i++){
        $('l1-'+i).addEventListener('click', ()=>{
            if(board[0][i] == selected){
                board[0].splice(i,1,null)
            }else{
                if ( balance + pieces[selected].cost <= maxBalance ){
                    board[0].splice(i,1,selected)
                }
            }
            update()
        })
        $('l2-'+i).addEventListener('click', ()=>{
            if(board[1][i] == selected){
                board[1].splice(i,1,null)
            }else{
                if ( balance + pieces[selected].cost <= maxBalance ){
                    board[1].splice(i,1,selected)
                }
            }
            update()
        })
    }
    localStorage.setItem('team'+setting, JSON.stringify(board))
    $('balance').innerHTML = balance
    $('maxBalance').innerHTML = maxBalance
}
update()

$('next').addEventListener('click', ()=>{
    localStorage.setItem('team'+setting, JSON.stringify(board))
    localStorage.setItem('teamReady'+setting, 'true')
    location.reload()
})