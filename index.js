continueGame = $('continue')
play = $('play')
info = $('info')
settings = $('settings')
source = $('source')

play.addEventListener('click', ()=>{
    window.open('./game setup.html', '_self')
})
continueGame.addEventListener('click', ()=>{
    if( localStorage.getItem('continue') !='false' & localStorage.getItem('continue') != null ){
        window.open('./game.html', '_self')
    }
})
info.addEventListener('click', ()=>{
    window.open('./info.html', '_self')
})
source.addEventListener('click', ()=>{
    window.open('https://github.com/9EED')
})