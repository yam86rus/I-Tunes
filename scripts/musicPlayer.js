import {
    addZero
} from './supScripts.js';

export const musicPlayerInit = () => {
    // получение элементов
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    // создание плэй листа с треками
    const playlist = ['hello', 'flow', 'speed'];

    // определение индекса, проигрываемого трека
    let trackIndex = 0;

    // Запуск трека
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused; // играет трек или нет
        const track = playlist[trackIndex]; //получение текущего номера трека

        audioHeader.textContent = track.toUpperCase(); // получаем и выводим название трека
        audioImg.src = `./audio/${track}.jpg`; // получаем картинку трека
        audioPlayer.src = `./audio/${track}.mp3`; //получем путь до трека

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        if (
            trackIndex != 0
        ) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        // запускаем трек
        loadTrack();
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        // запускаем трек
        loadTrack();
    };



    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        // клик по кнопке 'play'
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            // запуск и пауза плеера
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase(); // получаем и выводим название трека
        }

        // клик по кнопке 'prev'
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        // клик по кнопке 'next'
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    // Автоматическое проигрывание следующего трека, когда текущий закончился
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    // Progress bar
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        // меняем ширину в зависимости от пройденного времени
        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    // перемотка по progress bar
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    // остановка music player
    musicPlayerInit.stop = () => {
        if(!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    };
};