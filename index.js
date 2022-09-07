continueGame = $('continue')
play = $('play')
faq = $('faq')
settings = $('settings')
credits = $('credits')

play.addEventListener('click', ()=>{
    window.location = './game setup.html'
})
continueGame.addEventListener('click', ()=>{
    if( localStorage.getItem('continue') !='false' & localStorage.getItem('continue') != null ){
        window.location = './game.html'
    }
})