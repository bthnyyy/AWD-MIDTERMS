var songs = [
    {
        src: "./songs/Sweet Venom.mp3", 
        title: "Sweet Venom", 
        images: ["./gif/sweet venom.gif", "./gif/sweet venom 2.gif", "./gif/sweet venom 3.gif"]
    },
    {
        src: "./songs/Bite Me.mp3", 
        title: "Bite Me", 
        images: ["./gif/bite me.gif", "./gif/bite me 2.gif", "./gif/bite me 3.gif"]
    },
    {
        src: "./songs/One and Only.mp3", 
        title: "One and Only", 
        images: ["./gif/one and only.gif", "./gif/one and only 2.gif", "./gif/one and only 3.gif"]
    },
    {
        src: "./songs/Drunk-Dazed.mp3", 
        title: "Drunked-Dazed", 
        images: ["./gif/drunk dazed.gif", "./gif/drunk dazed 2.gif", "./gif/drunk dazed 3.gif"]
    },
    {
        src: "./songs/Pass the Mic.mp3", 
        title: "Pass the Mic", 
        images: ["./gif/pass the mic.gif", "./gif/pass the mic 2.gif"]
    },
    {
        src: "./songs/Polaroid Love.mp3", 
        title: "Polaroid Love", 
        images: ["./gif/polaroid love.gif", "./gif/polaroid love 2.gif", "./gif/polaroid love 3.gif"]
    },
];
var currentSong = 0;
var currentImageIndex = 0;
var imageInterval;

var audio = document.querySelector('.player-audio');
var image = document.querySelector('.player-image');
var title = document.querySelector('#title');
var playButton = document.querySelector('#play_button');
var containers = document.querySelectorAll('.container');
var player = document.querySelector('.player');
var header = document.querySelector('.header');

audio.src = songs[currentSong].src;
image.src = songs[currentSong].images[0];

document.querySelectorAll('.container .box').forEach(function(box, index) {
    box.addEventListener('click', function() {
        currentSong = index;
        currentImageIndex = 0;
        startSong();
        containers.forEach(container => container.classList.add('hidden'));
        player.classList.remove('hidden');
        document.body.style.backgroundImage = `url(${songs[currentSong].images[0]})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    });
});

audio.addEventListener('ended', function() {
    document.querySelector('#play_button i').className = "fas fa-play";
});

playButton.addEventListener('click', playMusic);
document.querySelector('#next_button').addEventListener('click', playNext);
document.querySelector('#prev_button').addEventListener('click', playPrev);

function playMusic() {
    if (audio.paused) {
        audio.play();
        playButton.querySelector('i').className = "fas fa-pause";
        header.classList.add('hidden'); 
    } else {
        audio.pause();
        playButton.querySelector('i').className = "fas fa-play";
        clearInterval(imageInterval);
    }
}

function playNext() {
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    currentImageIndex = 0;
    startSong();
}

function playPrev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    currentImageIndex = 0;
    startSong();
}

function startSong() {
    audio.src = songs[currentSong].src;
    image.src = songs[currentSong].images[currentImageIndex];
    title.textContent = songs[currentSong].title; 
    title.classList.add('song-title'); 
    audio.play();
    playButton.querySelector('i').className = "fas fa-pause";
    header.classList.add('hidden'); 

    clearInterval(imageInterval);
    imageInterval = setInterval(function() {
        currentImageIndex++;
        if (currentImageIndex >= songs[currentSong].images.length) {
            currentImageIndex = 0;
        }
        image.src = songs[currentSong].images[currentImageIndex];
    }, 5000);
}