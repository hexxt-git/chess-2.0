const NO = 0
const YES = 1
const KILL = 2
const NEWMOVE = 0
const MOVING = 1
function rdm(max){
    return Math.floor(Math.random()*(max +1));
};
function random(min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround(x, floor){
    if (floor) return Math.floor(Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x
}
function write(input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error(input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $(id){
    return document.getElementById(id);
};
function randomColor(){
    return `hsl(${rdm(360)}, ${random(20, 70, true)}%, 50%)`
};
function getLine(x1, y1, x2, y2){
    let line = []
    if(x1 - x2 == 0 && y1 - y2 == 0) return line
    let dx = Math.abs(x1 - x2)
    let dy = Math.abs(y1 - y2)
    let m = dy / dx
    let steps = m > 1 ? dy : dx;
    let xincrement = dx / steps * (x1-x2 >= 0 ? -1 : 1)
    let yincrement = dy / steps * (y1-y2 >= 0 ? -1 : 1)
    for(let i = 0 ; i < steps+1 ; i++ ){
        line.push({x:Math.floor(x1+xincrement*i), y:Math.floor(y1+yincrement*i)})
    }
    return line
};
function getCircle(x, y, r){
    let circle = []
    for(let x1 = -r-1 ; x1 < r+1 ; x1++){
        for(let y1 = -r-1 ; y1 < r+1 ; y1++){
            if(Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2))<=r) circle.push({x:x+x1, y:y+y1})
        }
    }
    return circle
};
function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h,s,l];
};
function pieceAt(board, x, y){
    for(p in board){
        if(board[p].x == x & board[p].y == y){
            return board[p]
        }
    }
    return null
};
function checker(c,size){
    for( let x = 0 ; x < size+4 ; x++){
        for( let y = 0 ; y < size+4 ; y++){
            c.fillStyle = (x+y%2)%2?'#0b0b0b':'darkcyan'
            c.fillRect(x*size, y*size, size, size)
        }
    }
    c.fillStyle = 'dakcyan'
    c.fillRect(0, 0, size*2+1, size*2+1)
    c.fillRect(0, (boardSize+2)*size-1, size*2+1, size*2+1)
    c.fillRect((boardSize+2)*size-1, 0, size*2+1, size*2+1)
    c.fillRect((boardSize+2)*size-1, (boardSize+2)*size-1, size*2+1, size*2+1)
    c.fillStyle = '#0b0b0b'
    c.fillRect(0, 0, size*2-5, size*2-5)
    c.fillRect(0, (boardSize+2)*size+5, size*2-5, size*2-5)
    c.fillRect((boardSize+2)*size+5, 0, size*2-5, size*2-5)
    c.fillRect((boardSize+2)*size+5, (boardSize+2)*size+5, size*2, size*2)
}