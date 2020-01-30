export default function parallaxAnimation() {
    //html secciones e items
    let fraganciasList = document.querySelector('.fragancias');
    let fragancia = document.querySelectorAll('.fragancia');
    let sugerido = document.querySelector('.sugerido');
    
    //define el alto de todas las fragancias
    let hFrag = fragancia[0].offsetHeight;
    //define cuando empezar el parallax que sería el alto individual de cada fragancia - (el alto de la ventana-el alto de cada fragancia)
    let pxStart = hFrag - (innerHeight-hFrag);
    
    //define la altura del contenedor de fragancias para crear ese seudo detenimiento y que se pueda seguir haciendo scroll
    fraganciasList.style.height = (hFrag*9) + 'px';
    
    //evento scroll
    window.addEventListener('scroll', function(){
        //variables posicion
        let barra = window.scrollY; //posicion actual de scroll
        //console.log(barra);

        //burbujas
        let bubles1 = fragancia[0].querySelector('.bubles');
        bubles1.style.transform = 'translateY(-' + (barra/19) + '%)';

        //flores
        let flores1 = fragancia[0].querySelector('.flores');
        flores1.style.transform = 'translateY(-' + (barra/59) + '%)';

        if ( (barra <= pxStart ) ) {
            fragancia[0].classList.add('active');
            fragancia[0].classList.remove('off');
            fragancia[1].classList.remove('active');
            fragancia[1].classList.remove('off');
            fragancia[2].classList.remove('active');
            fragancia[2].classList.remove('off');
            fragancia[0].style.position = 'relative';
            fragancia[1].style.position = 'relative';
            fragancia[2].style.position = 'relative';
            fragancia[0].style.bottom = '0';
            fragancia[1].style.bottom = '-100%';
            fragancia[2].style.bottom = '-200%';
            
            //tag sugerido
            sugerido.classList.remove('fixed');

        }else if ( (barra >= pxStart ) && (barra <= hFrag*2 ) ) {
            //console.log('activo0');
            fragancia[0].classList.remove('off');
            fragancia[0].style.position = 'fixed';
            fragancia[0].style.bottom = '0';
            fragancia[1].style.position = 'fixed';
            fragancia[1].style.bottom = '-100%';
            fragancia[2].style.position = 'fixed';
            fragancia[2].style.bottom = '-200%';
            
            //tag sugerido
            sugerido.classList.add('fixed');
            
        } else if ( (barra >= hFrag*2 ) && (barra <= hFrag*5 ) ) {
            //console.log('activo1');
            fragancia[0].classList.add('active');
            fragancia[0].classList.add('off');
            fragancia[1].classList.add('active');
            fragancia[1].classList.remove('off');
            fragancia[2].classList.remove('active');
            fragancia[2].classList.remove('off');
            fragancia[0].style.position = 'fixed';
            fragancia[1].style.position = 'fixed';
            fragancia[1].style.bottom = '0';
            fragancia[2].style.position = 'fixed';
            fragancia[2].style.bottom = '-100%';
            
            //tag sugerido
            sugerido.classList.add('fixed');

            //burbujas
            let bubles2 = fragancia[1].querySelector('.bubles');
            bubles2.style.transform = 'translateY(-' + (barra/19) + '%)';

            //flores
            let flores2 = fragancia[1].querySelector('.flores');
            flores2.style.transform = 'translateY(-' + (barra/59) + '%)';

        } else if ( (barra >= hFrag*5 ) && (barra <= hFrag*9 ) ) {
            //console.log('activo2');
            fragancia[0].classList.add('active');
            fragancia[0].classList.add('off');
            fragancia[1].classList.add('active');
            fragancia[1].classList.add('off');
            fragancia[2].classList.add('active');
            fragancia[2].classList.remove('off');
            fragancia[0].style.position = 'fixed';
            fragancia[1].style.position = 'fixed';
            fragancia[2].style.position = 'fixed';
            fragancia[2].style.bottom = '0';

            //tag sugerido
            sugerido.classList.add('fixed');

            //burbujas
            let bubles3 = fragancia[2].querySelector('.bubles');
            bubles3.style.transform = 'translateY(-' + (barra/19) + '%)';

            //flores
            let flores3 = fragancia[2].querySelector('.flores');
            flores3.style.transform = 'translateY(-' + (barra/59) + '%)';

        } else {
            //console.log('sefue');
            fragancia[0].classList.add('active');
            fragancia[0].classList.add('off');
            fragancia[1].classList.add('active');
            fragancia[1].classList.add('off');
            fragancia[2].classList.add('active');
            fragancia[0].style.position = 'absolute';
            fragancia[1].style.position = 'absolute';
            fragancia[2].style.position = 'absolute';
            fragancia[2].style.bottom = '0';
            fragancia[1].style.bottom = '100%';
            fragancia[0].style.bottom = '200%';

            //tag sugerido
            sugerido.classList.remove('fixed');
        }

    });
    
}