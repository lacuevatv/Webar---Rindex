import './assets/css/style.scss';
import smoothScroll from './assets/js/smoth-scroll';
import parallaxAnimation from './assets/js/parallax-animation';

document.addEventListener("DOMContentLoaded", function() {

    //menu:
    let btnToggle = document.querySelector('.toggle');
    btnToggle.addEventListener('click', function(){
        togleMenu();
    });

    //btnscroll
    let btnscroll = document.querySelectorAll('.btn-scroll');
    for (let index = 0; index < btnscroll.length; index++) {
        btnscroll[index].addEventListener('click', function(){
            event.preventDefault();
            let href = '#' + this.getAttribute('href');
            smoothScroll( href );
        });
    }

    //video play
    let playButton = document.querySelector('.play-btn');
    playButton.addEventListener('click', function(){
        playVideo();
    });

 });

 window.addEventListener('load', function() {

    parallaxAnimation();
});

function togleMenu () {
    let btnToggle = document.querySelector('.toggle');
    let mainMenu = document.querySelector('.main-menu');

    if ( mainMenu.classList.contains('open') ) {
        //cerrar menu
        mainMenu.classList.remove('open');
        mainMenu.style.height = '0';
        btnToggle.classList.remove('open');

        setTimeout(function(){
            //mainMenu.style.display = 'none'; 
        },600);
    } else {
        //abrir menu
        //mainMenu.style.display = 'block'; 
        mainMenu.style.height = mainMenu.scrollHeight + 'px';
        mainMenu.classList.add('open');
        btnToggle.classList.add('open');
    }
}

//abre el video
function playVideo() {
    let iframe = document.querySelector('.video-iframe');
    let btnPlay = document.querySelector('.play-btn');
    let screenshot = document.querySelector('.video-screenshot');

    iframe.setAttribute('src', btnPlay.getAttribute('data-src')  );
    screenshot.style.opacity = '0';
    
    setTimeout(() => {
        screenshot.style.display = 'none';
    }, 1000);
}