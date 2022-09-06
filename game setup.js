localStorage.setItem('teamReady1', 'false')
localStorage.setItem('teamReady2', 'false')
localStorage.setItem('teamReady3', 'false')
localStorage.setItem('teamReady4', 'false')
localStorage.setItem('continue', 'false')

olderSettings = eval(localStorage.getItem('settings'))
olderPlayers = eval(localStorage.getItem('players'))
if(olderSettings != null){
    $('max-time').value = olderSettings.max_time
    $('max-turns').value = olderSettings.max_turns
    //$('plays-per-turn').value = olderSettings.plays_per_turn
    $('win-condition').options.selectedIndex = olderSettings.win_condition
    $('board').options.selectedIndex = olderSettings.board
    $('undos').value = olderSettings.undos
    $('skips').value = olderSettings.skips
    $('balance').value = olderSettings.balance
}
if(olderPlayers != null){
    $('name1').value = olderPlayers.name1
    $('color1').value = olderPlayers.color1
    $('enable1').className = olderPlayers.enable1?'enabled':'disabled'
    $('enable1').innerHTML = olderPlayers.enable1?'disable':'enable'
    $('name2').value = olderPlayers.name2
    $('color2').value = olderPlayers.color2
    $('enable2').className = olderPlayers.enable2?'enabled':'disabled'
    $('enable2').innerHTML = olderPlayers.enable2?'disable':'enable'
    $('name3').value = olderPlayers.name3
    $('color3').value = olderPlayers.color3
    $('enable3').className = olderPlayers.enable3?'enabled':'disabled'
    $('enable3').innerHTML = olderPlayers.enable3?'disable':'enable'
    $('name4').value = olderPlayers.name4
    $('color4').value = olderPlayers.color4
    $('enable4').className = olderPlayers.enable4?'enabled':'disabled'
    $('enable4').innerHTML = olderPlayers.enable4?'disable':'enable'
}

function update(){
    setTimeout(function() {
        requestAnimationFrame(update)
        settings = {
            max_time: $('max-time').value,
            max_turns: $('max-turns').value,
            //plays_per_turn: $('plays-per-turn').value,
            win_condition: $('win-condition').options.selectedIndex,
            board: $('board').options.selectedIndex,
            undos: $('undos').value,
            skips: $('skips').value,
            balance: $('balance').value
        }
        players = {
            name1: $('name1').value,
            color1: $('color1').value,
            enable1: $('enable1').className == 'enabled',
            name2: $('name2').value,
            color2: $('color2').value,
            enable2: $('enable2').className == 'enabled',
            name3: $('name3').value,
            color3: $('color3').value,
            enable3: $('enable3').className == 'enabled',
            name4: $('name4').value,
            color4: $('color4').value,
            enable4: $('enable4').className == 'enabled'
        }
        settingString = '('+JSON.stringify(settings)+')'
        settingPlayers = '('+JSON.stringify(players)+')'
        localStorage.setItem('settings', settingString)
        localStorage.setItem('players', settingPlayers)
    }, 100);
}
update()

for(let i = 1 ; i <= 4 ; i++){
    $('enable'+i).addEventListener('click',()=>{
        if($('enable'+i).className == 'disabled'){
            $('enable'+i).className  = 'enabled'
            $('enable'+i).innerHTML  = 'disable'
            $('name'+i).required = true
        }
        else{
            $('enable'+i).className  = 'disabled'
            $('enable'+i).innerHTML  = 'enable'
            $('name'+i).required = false
        }
    })
    if($('enable'+i).className == 'disabled'){
        $('name'+i).required = false
    }
    else{
        $('name'+i).required = true
    }
}