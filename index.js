continueGame = $('continue')
play = $('play')
faq = $('faq')
settings = $('settings')
credits = $('credits')

play.addEventListener('click', ()=>{
    window.location = './game setup.html'
})
write(eval(localStorage.getItem('settings')))
write(eval(localStorage.getItem('players')))