import smoothScroll from "./smoth-scroll";

export default function parallaxAnimation() {
    //html secciones e items
    let main = document.querySelector('.main-wrapper');
    let section = document.querySelector('.fragancias-section');
    let nextSection = document.querySelector('.porque-section');
    let videoSection = document.querySelector('.video-section');
    let comprarSection = document.querySelector('.comprar-section');
    let fraganciasList = document.querySelector('.fragancias');
    let fragancia = document.querySelectorAll('.fragancia');
    let nav = document.querySelector('.main-nav');
    let header = document.querySelector('.main-header');
    let sugerido = document.querySelector('.sugerido');

    //variables de funcion
    let oldBarra = 0;//guarda estado anterior de la barra
    let outParallax = false;//cundo se termina el efecto se tiene que salir una sola vez, sino se vuelve cíclico y no sale mas
    
    //define cada cuanto se cambian los activos de las fragancias
    let pixelesEntrePasos = 1000;
    if ( window.innerWidth < 992) {
        pixelesEntrePasos = 1200;
    }

    let parallaxIn = header.offsetHeight - nav.offsetHeight;
    let barraPaso1 = parallaxIn + pixelesEntrePasos;
    let barraPaso2 = barraPaso1 + pixelesEntrePasos;
    let barraOut = barraPaso2 + pixelesEntrePasos;

    let pasos = 0;//los tres pasos de fragancias a ejecutar

    let valoresPorDefecto = {
        main : {
            height: main.offsetHeight + 'px',
        },
        section: {
            height: section.offsetHeight + 'px',
            position: section.style.position,
            left: section.style.left,
            top: section.style.top,
        },
        nextSection : {
            height: nextSection.offsetHeight + 'px',
            position: nextSection.style.position,
            left: nextSection.style.left,
            top: nextSection.style.top,
        },
        videoSection : {
            height: videoSection.offsetHeight + 'px',
            position: videoSection.style.position,
            left: videoSection.style.left,
            top: videoSection.style.top,
        },
        comprarSection : {
            height: comprarSection.offsetHeight + 'px',
            position: comprarSection.style.position,
            left: comprarSection.style.left,
            top: comprarSection.style.top,
        },
        sugerido : {
            top: sugerido.style.top,
            position: sugerido.style.position
        }
    }

    //evento click en comprar
    let btnComprar = document.querySelectorAll('.btn-scroll-comprar');

    for (let i = 0; i < btnComprar.length; i++) {
        btnComprar[i].addEventListener('click', function(){
            event.preventDefault();
            goToBottomComprar();
            if ( window.innerWidth < 992) {
                let mainMenu = document.querySelector('.main-menu');
                if ( mainMenu.classList.contains('open') ) {
                    //cerrar menu
                    mainMenu.classList.remove('open');
                    mainMenu.style.height = '0';
                    document.querySelector('.toggle').classList.remove('open');
                }
            }
        });
    }
    
    //evento scroll
    window.addEventListener('scroll', eventoScroll);
    function eventoScroll (){
        //variables posicion
        let barra = window.scrollY; //posicion actual de scroll
        let avanceBarra = barra-oldBarra;//cuanto avanzó la posicion
        oldBarra = barra;//guarda la barra actual
        
        //burbujas
        let bubles = fragancia[pasos].querySelector('.bubles');
        bubles.style.transform = 'translateY(-' + (barra/19) + '%)';

        //flores
        let flores = fragancia[pasos].querySelector('.flores');
        flores.style.transform = 'translateY(-' + (barra/59) + '%)';

        //paso de fragancias
        if (  (barra >= (  parallaxIn ) ) &&  barra<barraOut) {
            //console.log(barra);
            outParallax = false;

            //llama a funcion para cambiar de paso (para adelante o atras)
            if (avanceBarra > 0) {
                nuevoPaso('next', barra);
            } else {
                nuevoPaso('prev', barra);
            } 

            section.style.height = section.offsetHeight +'px'
            section.style.position = 'fixed';
            section.style.width = '100%';
            section.style.left = '0';
            section.style.top =  nav.getBoundingClientRect().height + 'px';

            nextSection.style.height = (nextSection.offsetHeight) +'px'
            nextSection.style.position = 'fixed';
            nextSection.style.width = '100%';
            nextSection.style.left = '0';
            nextSection.style.top =  ( nav.getBoundingClientRect().height + section.offsetHeight ) + 'px';

            //detiene el tag de sugerido
            sugerido.style.position = 'fixed';
            sugerido.style.top = 'calc(' + nav.getBoundingClientRect().height + 'px + 5%)';

            //agrega altura a main para que siga scroleando
            main.style.height = (main.offsetHeight+avanceBarra) + 'px'
            
        } else if ( barra <= parallaxIn ) {
            //antes del parallax vuelve todo a cero

            returntoDefault();
            
        } else {
            //sale del parallax hacia abajo

            if ( !outParallax ) {
                outParallax = true;

                salirParallax(barra);
            }
        }
    }//fin eventoscroll

    //ve que activo nuevo hay que poner
    function nuevoPaso(direccion, barra) {
    
        switch (pasos) {
            case 0:
               if ( direccion == 'prev' )  {
                   return true;
                } else {
                    if ( barra >= barraPaso1 ) {
                        pasos = 1;
                        newActive(0, 'next');
                    } else if ( barra >= barraPaso2 ) {
                        pasos = 2;
                        newActive(0, 'next');
                    }
                }
            break;
        
            case 1:
                if ( direccion == 'next' )  {
                    if ( barra >= barraPaso2 ) {
                        pasos = 2;
                        newActive(1, 'next');
                    }
                } else {
                    if ( barra <= barraPaso1 ) {
                        pasos = 0;
                        newActive(1, 'prev');
                    } else if ( barra <= barraPaso2 ) {
                        pasos = 1;
                        newActive(1, 'prev');
                    } else if ( barra <= barraOut ) {
                        pasos = 2;
                        newActive(1, 'prev');
                    } 
                }
            break;

            case 2:
                if ( direccion == 'next' )  {
                    return true;
                } else {
                    if ( barra <= barraPaso1 ) {
                        pasos = 0;
                        newActive(2, 'prev');
                    } else if ( barra <= barraPaso2 ) {
                        pasos = 1;
                        newActive(2, 'prev');
                    }
                }
            break;
        }
    }

    //cambia los activos de las fragancias
    let secure = undefined;
    function newActive(oldPaso, direccion) {
        if (oldPaso == pasos)  {
            return true;
        }
        
        if (direccion == 'prev') {
            fragancia[pasos].style.transition = 'opacity 500ms';
            fragancia[oldPaso].style.transition = 'opacity 500ms';
        } else if (direccion == 'next') {
            fragancia[pasos].style.transition = 'all 300ms';
            fragancia[oldPaso].style.transition = 'opacity 500ms';
        }

        fragancia[pasos].classList.add('active');
        fragancia[oldPaso].classList.remove('active');
        
    }

    //esta funcion sale del parallax
    function salirParallax (barra){
        //DETIENE ALTURA DE MAIN
        main.style.height = (main.offsetHeight) + 'px'

        //section fixed to absolute
        section.style.position = 'absolute';
        section.style.top = (barra-section.offsetHeight) + 'px';
        nextSection.style.position = 'absolute';
        nextSection.style.top = (barra) + 'px';
        
        //vulve el tag de sugerido a su posicion
        sugerido.style.position = valoresPorDefecto.sugerido.position;
        sugerido.style.top = valoresPorDefecto.sugerido.top;

        //posiciona las otras section
        videoSection.style.position = 'absolute';
        videoSection.style.top = (barra+nextSection.offsetHeight) + 'px';
        comprarSection.style.position = 'absolute';
        comprarSection.style.top = (barra+nextSection.offsetHeight+videoSection.offsetHeight) + 'px';

        //DEFINE ALTURA DE MAIN
        //toma la altura actual y le asigna el resto para que los elementos que siguen esten bien ubicados
        main.style.height = ( parseInt(comprarSection.style.top)+ comprarSection.offsetHeight+100) + 'px'
    }

    //devuelve todos los varlores a cuando estaban antes de iniciar
    function returntoDefault() {
        
        outParallax = false;
        if ( pasos != 0 ) {
            let oldPasos = pasos;
            pasos = 0;
            newActive(oldPasos);
        }
        
        //default main
        main.style.height = valoresPorDefecto.main.height;
        //default la section
        section.style.height = valoresPorDefecto.section.height;
        section.style.position = valoresPorDefecto.section.position;
        section.style.left = valoresPorDefecto.section.left;
        section.style.top =  valoresPorDefecto.section.top;
        //default la nextsection
        nextSection.style.height = valoresPorDefecto.nextSection.height;
        nextSection.style.position = valoresPorDefecto.nextSection.position;
        nextSection.style.left = valoresPorDefecto.nextSection.left;
        nextSection.style.top =  valoresPorDefecto.nextSection.top;
        //default el tag de sugerido
        sugerido.style.position = valoresPorDefecto.sugerido.position;
        sugerido.style.top = valoresPorDefecto.sugerido.top;
        //defaultVideo
        videoSection.style.height = valoresPorDefecto.videoSection.height;
        videoSection.style.position = valoresPorDefecto.videoSection.position;
        videoSection.style.left = valoresPorDefecto.videoSection.left;
        videoSection.style.top =  valoresPorDefecto.videoSection.top;
        //defaultComprar
        comprarSection.style.height = valoresPorDefecto.comprarSection.height;
        comprarSection.style.position = valoresPorDefecto.comprarSection.position;
        comprarSection.style.left = valoresPorDefecto.comprarSection.left;
        comprarSection.style.top =  valoresPorDefecto.comprarSection.top;
    }




    //chequea si el elemento es visible
    function isVisible ( el ) {
        var result = false;
        // Browser viewport
        var viewport_h = window.innerHeight;
        var viewport_top = window.pageYOffset;
        var viewport_bottom = viewport_top + viewport_h;
        // DOM Element
        var el_h = el.offsetHeight;                  // Height
        var el_top = el.getBoundingClientRect().top; // Top
        var el_bottom = el_top + el_h;               // Bottom
        // Is inside viewport?
        if ( el_bottom > 0 && el_top < viewport_h ) { 
          result = 1.0 - ( el_top + el_h ) / ( viewport_h + el_h );
        }
        
        return result;
    }

    let cuentaScroll = 0;
    function goToBottomComprar() {

        scrollBy(0, document.body.scrollHeight );
        
        let myscroll = setInterval(function(){
            scrollBy(0, document.body.scrollHeight-document.querySelector('.main-footer').offsetHeight);
            cuentaScroll++;

            if ( cuentaScroll > 10 ) {
                clearInterval(myscroll)
                smoothScroll('#comprar');
            }
        },100);
    }

}