let slides = [
    {city: 'Rostov-on-Don <br> LCD admiral',
     area: '81 m2',
     time: '3.5 months',
     cost: 'Upon request'},

    {city: 'Sochi <br> Thieves',
     area: '105 m2',
     time: '4 months',
     cost: 'Upon request'},

    {city: 'Rostov-on-Don <br> Patriotic',
     area: '93 m2',
     time: '3 months',
     cost: 'Upon request'},
]

let currentSlide = 0;
let countSlides = 3;
let switchingTime = 500;

function waitForAnimation(switchingTime) {
    removeListeners();
    setTimeout(() => {
        addListeners()
    }, switchingTime)
}

function addListeners() {
    let links = document.querySelectorAll('.slider__link');
    for (let elem of links) {
        elem.addEventListener('click', nextSlide)
    }

    let dots = document.querySelectorAll('.slider__dot');
    for (let elem of dots) {
        elem.addEventListener('click', nextSlide)
    }

    let arrows = document.querySelectorAll('.slider__arrow');
    for (let elem of arrows) {
        elem.addEventListener('click', nextSlide)
    }
}

function removeListeners() {
    let links = document.querySelectorAll('.slider__link');
    for (let elem of links) {
        elem.removeEventListener('click', nextSlide)
    }

    let dots = document.querySelectorAll('.slider__dot');
    for (let elem of dots) {
        elem.removeEventListener('click', nextSlide)
    }

    let arrows = document.querySelectorAll('.slider__arrow');
    for (let elem of arrows) {
        elem.removeEventListener('click', nextSlide)
    } 
}

addListeners()

function changeAll(slide) {
    changeImg(slide);
    changeNav(slide);
    changeText(slide);
    waitForAnimation(switchingTime)
    currentSlide = slide;
}

function nextSlide(e) {
    let slide = e.currentTarget.getAttribute('data-slide');
    if (slide === 'next') {
        if (currentSlide === countSlides - 1) {
            changeAll(0)
        } else {
            changeAll(currentSlide + 1)
        }
    } else if (slide === 'back') {
        if (currentSlide === 0) {
            changeAll(countSlides - 1)
        } else {
            changeAll(currentSlide - 1)
        }
    } else if (currentSlide !== +slide) (
        changeAll(+slide)
    ) 
}

function changeText(slide) {
    let city = {name:'city'};
    let area = {name:'area'};
    let time = {name:'time'};
    let cost = {name:'cost'};
    let next = [city, area, time, cost];

    for (let i = 0; i < 4; i++) {
        next[i].nextElem = document.createElement('p');
        next[i].nextElem.classList.add('slider__data-text');
        next[i].nextElem.innerHTML = slides[slide][next[i].name];
        next[i].parentElem = document.querySelector(`.slider__${next[i].name}`);
    }

    let maxScroll = document.querySelector('.slider__city').scrollWidth;
    let unit = maxScroll / (switchingTime / 20);
    
    if (currentSlide > slide) {
        for (let i = 0; i < 4; i++) {
            next[i].parentElem.prepend(next[i].nextElem);
            next[i].parentElem.scrollLeft = next[i].nextElem.getBoundingClientRect().width;
        }

        let currentScroll = next[0].parentElem.scrollLeft;

        let moveElem = setInterval(() => {
            currentScroll -= unit;
            for (let i = 0; i < 4; i++) {
                next[i].parentElem.scrollLeft = currentScroll;
            }
            if (next[0].parentElem.scrollLeft === 0) {
                for (let i = 0; i < 4; i++) {
                    next[i].parentElem.lastElementChild.remove();
                }
                clearInterval(moveElem)
            }
        }, 20)
    } else {
        for (let i = 0; i < 4; i++) {
            next[i].parentElem.append(next[i].nextElem);
        }

        let currentScroll = unit;

        let moveElem = setInterval(() => {
            currentScroll += unit;
            for (let i = 0; i < 4; i++) {
                next[i].parentElem.scrollLeft = currentScroll;
            }
            if (next[0].parentElem.scrollLeft >= maxScroll) {
                for (let i = 0; i < 4; i++) {
                    next[i].parentElem.firstElementChild.remove();
                }
                clearInterval(moveElem)
            }
        }, 20)
    }
}

function changeNav(slide) {
    let currentLink = document.querySelector('.slider__link_active');
    let currentDot = document.querySelector('.slider__dot_active');
    let nextLink = document.querySelector(`.slider__link:nth-child(${slide+1})`);
    let nextDot = document.querySelector(`.slider__dot:nth-child(${slide+1})`);

    currentLink.classList.remove('slider__link_active');
    currentDot.classList.remove('slider__dot_active');
    nextLink.classList.add('slider__link_active');
    nextDot.classList.add('slider__dot_active')
}

function changeImg(slide) {
    let currentImg = document.querySelector(`.slider__img${currentSlide}`);
    let nextImg = document.querySelector(`.slider__img${slide}`)

    nextImg.style.display = 'block';
    nextImg.style.opacity = 0;
    currentImg.style.opacity = 1;

    let changeOpacity = setInterval(() => {
        let unit = 1 / (switchingTime / 20);
        nextImg.style.opacity = +nextImg.style.opacity + unit;
        currentImg.style.opacity = +currentImg.style.opacity - unit;

        if (+currentImg.style.opacity <= 0) {
            clearInterval(changeOpacity)
        }
    }, 20)
}