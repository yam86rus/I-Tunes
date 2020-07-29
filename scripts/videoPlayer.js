export const videoPlayerInit = () => {

    // получение элементов

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoFullscreen = document.querySelector('.video-fullscreen');
    const videoVolume = document.querySelector('.video-volume');

    //  смена иконок "Play" / "Pause"

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    // запуск и пауза видео

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    // Остановка видео
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    // Добавление '0' в отображение таймера
    const addZero = n => n < 10 ? '0' + n : n;

    // События элементов

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    // развернуть на веь экран
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    // громкость
    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayer.volume = 0.2;
    videoVolume.value = videoPlayer.volume * 100;

};