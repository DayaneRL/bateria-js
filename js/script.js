document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase())
})

function playSound(sound){
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if(audioElement){
        audioElement.currentTime = 0
        audioElement.play()
    }

    if(keyElement) {
        keyElement.classList.add('active')
        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 300)
    }
}

document.querySelector('.composer .play button').addEventListener('click', () => {
    let song = document.querySelector('#input').value
    if(song != ''){
        let songArray = song.split('')
        playComposition(songArray)
    }
})

function playComposition(songArray){
    let wait = 0
    for(let item of songArray){
        setTimeout( () => {
            playSound(`key${item}`)
        }, wait)
        wait += 200
    }
}