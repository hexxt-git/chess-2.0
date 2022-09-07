localStorage.setItem('continue', 'false')

if(localStorage.getItem('draw') == 'false'){
    $('winner').innerHTML = localStorage.getItem('winner') + ' won!'
} else {
    $('winner').innerHTML = 'its a draw nobody wins!'
}

$('home').addEventListener('click',()=>{
    window.location = './index.html'
})
$('replay').addEventListener('click',()=>{
    window.location = './game.html'
})
$('conf').addEventListener('click', ()=>{
    addConfetti()
})

let container = $('container')
let canvas = $('canvas')

let width = container.clientWidth
let height = container.clientHeight

canvas.width = width
canvas.height = height

let c = canvas.getContext('2d')

function anim(){
    setTimeout(()=>{
        requestAnimationFrame(anim)
        c.clearRect(0, 0, width, height)
        while(conf.length > 5000) conf.shift()
        conf.forEach((m)=>{
            m.x += m.vx
            m.y += m.vy
            m.vy += 1
            c.fillStyle = m.color
            c.fillRect(m.x, m.y, m.size, m.size)
        })        
    },10)
}
function addConfetti(){
    for(let i = 0; i < 200; i++){
        let side = Math.random() > 0.5
        conf.push({
            x: (side ? 50 : width-50) + Math.random() * 100 - 50,
            y: height/2 + Math.random() * 100 - 50,
            vx: side ? Math.random() * 25 - 5 : Math.random() * 25 - 20 ,
            vy: Math.random() * - 25,
            size: Math.random()*10+5,
            color: randomColor()
        })
    }
}

let conf = []

addConfetti()

anim()
