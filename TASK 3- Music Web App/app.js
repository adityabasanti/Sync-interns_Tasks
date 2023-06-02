///top///

// navigations //
const musicPlayerSection = document.querySelector('.music-player-section');
let clickCount = 1;

musicPlayerSection.addEventListener('click', ()=>{
    if(clickCount>=2){
        musicPlayerSection.classList.add('active');
        clickCount=1;
        return
    }
    clickCount++;
    setTimeout(()=>{
        clickCount=1;
    },250);
})

// back from music player to home//

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click', ()=>{
    musicPlayerSection.classList.remove('active');
})

//access playlists//

const playlistSection = document.querySelector('.playlist-group');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', ()=>{
    playlistSection.classList.add('active');
})

//back from playlists to music player section//

const backToMusicPlayer = document.querySelector('.playlist-group .back-btn');

backToMusicPlayer.addEventListener('click', ()=>{
    playlistSection.classList.remove('active');
})

//navigation over//

//Music//

let currentMusic = 0;
const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];
//selecting all button here ===>//
const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

//done selecting//

//playBtn click//

playBtn.addEventListener('click', ()=>{
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

//pauseBtn click//

pauseBtn.addEventListener('click', ()=>{
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

//function for setting up music//

const setMusic = (i) =>{
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() =>{
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },300);

    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);

//Format duration in 00:00 format//

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min<10){
        min = `0`+ min;
    }

    let sec = Math.floor(time % 60);
    if(sec<10){
        sec = `0` + sec;
    }
    
    return `${min} : ${sec}`;
}

//seek events//

setInterval(() =>{
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime)== Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        }else{
            forwardBtn.click();
        }
    }
},500)

seekBar.addEventListener('change', ()=>{
    music.currentTime = seekBar.value;
})

//forward btn//

forwardBtn.addEventListener('click', ()=>{
    if(currentMusic>=songs.length - 1){
        currentMusic= 0;
    }else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

//backward button//

backwardBtn.addEventListener('click', ()=>{
    if(currentMusic<=0){
        currentMusic = songs.length - 1;
    }else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

//repeat btn//
repeatBtn.addEventListener('click', ()=>{
    repeatBtn.classList.toggle('active');
})

//volume section//
volumeBtn.addEventListener('click', ()=>{
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', ()=>{
    music.volume = volumeSlider.value;
})


queue.forEach((item,i) =>{
    item.addEventListener('click', ()=>{
        setMusic(i);
    playBtn.click();

    })   

})
    