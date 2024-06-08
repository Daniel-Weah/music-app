document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const cover = document.getElementById('cover');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const repeatButton = document.getElementById('repeat');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const playlistElement = document.getElementById('playlist');
    const progress = document.getElementById('progress');

    let isRepeating = false;
    let currentSongIndex = 0;

    const songs = [
        { title: "Black Lives Matter", src: "assets/music/Black Lives Matter.mp3", cover: "assets/image/Black_Lives_Matter.jpeg", artist: "Dax" },
        { title: "Dear God", src: "assets/music/Dear God.mp3", cover: "assets/image/Dear_God.jpeg", artist: "Dax" },
        { title: "Dear Mom", src: "assets/music/Dear Mom.mp3", cover: "assets/image/Dear_Mom.jpeg", artist: "Dax" },
        { title: "Devil's Plan", src: "assets/music/Devil's Plan.mp3", cover: "assets/image/Devil's_Plan.jpeg", artist: "Dax" },
        { title: "I Can't Breathe", src: "assets/music/I Can't Breath.mp3", cover: "assets/image/I_Can't_Breath.jpeg", artist: "Dax" },
        { title: "I don't want another sorry", src: "assets/music/I don't want another sorry.mp3", cover: "assets/image/I_don't_want_another_sorry.jpeg", artist: "Dax ft Trippie Redd" },
        { title: "I need a break", src: "assets/music/I need a break.mp3", cover: "assets/image/I_need_a_break.jpeg", artist: "Dax" },
        { title: "Love Hurts", src: "assets/music/Love Hurts.mp3", cover: "assets/image/Love_Hurts.jpeg", artist: "Dax" },
        { title: "My Heart Hurts", src: "assets/music/My Heart Hurts.mp3", cover: "assets/image/My_heart_hurts.jpeg", artist: "Dax" },
        { title: "My Last Words", src: "assets/music/My Last Words.mp3", cover: "assets/image/My_last_words.jpeg", artist: "Dax" },
    ];

    function loadSong(song) {
        title.innerText = song.title;
        audio.src = song.src;
        cover.src = song.cover;
        artist.innerText = song.artist;
    }

    function playSong() {
        audio.play();
    }

    function pauseSong() {
        audio.pause();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function toggleRepeat() {
        isRepeating = !isRepeating;
        repeatButton.style.backgroundColor = isRepeating ? '#0056b3' : '#007bff';
        audio.loop = isRepeating;
    }

    function generatePlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerText = song.title;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(songs[currentSongIndex]);
                playSong();
            });
            playlistElement.appendChild(li);
        });
    }

    function updateTiming() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        currentTimeElement.innerText = formatTime(currentTime);
        durationElement.innerText = formatTime(duration);
        progress.value = (currentTime / duration) * 100;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

    playButton.addEventListener('click', playSong);
    pauseButton.addEventListener('click', pauseSong);
    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    repeatButton.addEventListener('click', toggleRepeat);
    audio.addEventListener('timeupdate', updateTiming);
    progress.addEventListener('click', setProgress);

    // Load the first song initially
    loadSong(songs[currentSongIndex]);
    generatePlaylist();
});
