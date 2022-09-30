let style = []

if(localStorage.getItem('style') != null){
    style = eval(localStorage.getItem('style'))
} else {
    style = [
        '#181818',
        '#111',
        'darkcyan',
        '#080808',
        '#0b0b0b',
        '#EEE',
        '#333',
    ]
}


document.querySelector('*').style = `
    --background: ${style[0]};
    --surfaces: ${style[1]};
    --accent: ${style[2]};
    --darker: ${style[3]};
    --dark: ${style[4]};
    --text: ${style[5]};
    --grey: ${style[6]};
`