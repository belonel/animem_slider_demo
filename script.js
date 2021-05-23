const audio = document.querySelector("#audio");


var slider = document.querySelector('.sim-slider');

var sldrList = document.querySelector('.sim-slider-list');
var sldrElements = document.querySelectorAll('.sim-slider-element');
var sldrElemFirst = document.querySelector('.sim-slider-element');
var leftArrow = document.querySelector('div.sim-slider-arrow-left');
var rightArrow = document.querySelector('div.sim-slider-arrow-right');

var stopBtn = document.querySelector('#stopBtn');
var playBtn = document.querySelector('#playBtn');

var startBtn = document.querySelector('.start-block button');

var defaults = {

        // Default options for the carousel
        loop: true,     // Бесконечное зацикливание слайдера
        auto: true,     // Автоматическое пролистывание
        interval: 5000, // Интервал между пролистыванием элементов (мс)
        arrows: true,   // Пролистывание стрелками
        dots: false      // Индикаторные точки
    };

// Initialization
var options = defaults;

var currentElement = 0;
var elemCount = sldrElements.length;

function elemPrev (num) {
    num = num || 1;

    let prevElement = currentElement;
    currentElement -= num;
    if(currentElement < 0) currentElement = elemCount-1;

    if(!options.loop) {
        if(currentElement == 0) {
            leftArrow.style.display = 'none'
        };
        rightArrow.style.display = 'block'
    };

    sldrElements[currentElement].style.opacity = '1';
    sldrElements[prevElement].style.opacity = '0';
}

function elemNext (num) {
    num = num || 1;

    let prevElement = currentElement;
    currentElement += num;
    if(currentElement >= elemCount) currentElement = 0;

    if(!options.loop) {
        if(currentElement == elemCount-1) {
            rightArrow.style.display = 'none'
        };
        leftArrow.style.display = 'block'
    };

    sldrElements[this.currentElement].style.opacity = '1';
    sldrElements[prevElement].style.opacity = '0';

};


let bgTime = getTime();

function getTime() {
    return new Date().getTime();
};

var autoScroll; 

function setAutoScroll() {
    autoScroll = setInterval(function() {
        let fnTime = getTime();
        if(fnTime - bgTime + 10 > options.interval) {
            bgTime = fnTime; elemNext()
        }
    }, options.interval)
};


function init_slider() {
    elemCount = sldrElements.length;
    currentElement = 0;


    // Start initialization
    if(elemCount <= 1) {   // Отключить навигацию
        options.auto = false; options.arrows = false; options.dots = false;
        leftArrow.style.display = 'none'; rightArrow.style.display = 'none'
    };
    if(elemCount >= 1) {   // показать первый элемент
        sldrElemFirst.style.opacity = '1';
    };

    if(!options.loop) {
        leftArrow.style.display = 'none';  // отключить левую стрелку
        options.auto = false; // отключить автопркрутку
    }
    else if(options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        //that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
        //that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
    };

    if(options.arrows) {  // инициализация стрелок
        leftArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > 1000) {
                bgTime = fnTime; elemPrev()
            }
        }, false);
        rightArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > 1000) {
                bgTime = fnTime; elemNext()
            }
        }, false)
    }
    else {
        leftArrow.style.display = 'none'; rightArrow.style.display = 'none'
    }
}

function start_show() {
    startBtn.style.display = 'none';
    
    audio.play();
    init_slider();
    slider.style.display = 'block';
    leftArrow.style.display = 'block';
    rightArrow.style.display = 'block';
    
    stopBtn.style.visibility = 'visible';
    playBtn.style.visibility = 'visible';
}


function stop_show() {
    clearInterval(autoScroll);
    audio.pause();
}

function continue_show() {
    elemNext();
    setAutoScroll();
    audio.play();
}

function init_start_screen() {
    stopBtn.style.visibility = 'hidden';
    playBtn.style.visibility = 'hidden';
    
    slider.style.display = 'none';
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
}

init_start_screen();