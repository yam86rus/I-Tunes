export const radioPlayerInit = () => {

    // получение элементов
    const radio = document.querySelector('.radio ');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');

    // создаем экземпляр класса Audio
    const audio = new Audio();
    audio.type = 'audio/aac';

    // блокируем кнопку 'play'
    radioStop.disabled = true;

    // смена иконки у кнопки "Play" / "Stop"
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    // удаляем у всех обводку и добавляем на выбранный ближайший класс, новый класс 'select' (серая обводка)
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select')); /* удаляем класс 'select' */
        elem.classList.add('select'); /* добавляем класс 'select' */
    };

    radioNavigation.addEventListener('change', event => {
        // выбираем dataset а в нем "data-radio-stantion" из radio button, по которому кликнули
        const target = event.target;
        audio.src = target.dataset.radioStantion;

        // отбираем ближайший класс '.radio-item'
        const parrent = target.closest('.radio-item');

        // вызов функции дабавления и удаления класса 'select'
        selectItem(parrent);

        // выводим название выбранной радиостанции на место надписи "Выбери радиостанцию"
        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        // выводиться картинка выбранной радиостанции
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        // разблокируем кнопку "Play"
        radioStop.disabled = false;
        // запускаем радио
        audio.play();
        // меняем иконку у кнопки
        changeIconPlay();
    });

    // запуск или остановка радио по клику на кнопку
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        // меняем иконку у кнопки
        changeIconPlay();
    });

    // громкость радио
    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    });
    audio.volume = 0.2;
    radioVolume.value = audio.volume * 100;

    // остановка radio player
    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};