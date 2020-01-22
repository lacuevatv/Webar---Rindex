import './assets/css/style.scss';

document.addEventListener("DOMContentLoaded", function() {
    let btnToggle = document.querySelector('.toggle');

    //menu:
    btnToggle.addEventListener('click', function(){
        togleMenu();
    });
 });

 window.addEventListener('load', function() {

    console.log('All loaded!');

});

function togleMenu () {
    let btnToggle = document.querySelector('.toggle');
    let mainMenu = document.querySelector('.main-menu');

    /*if ( window.innerWidth > 992 ) {
        mainMenu.style.display = 'flex'; 
    }*/

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