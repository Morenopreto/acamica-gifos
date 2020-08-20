// EN ESTE ARCHIVO PODEMOS ENCONTRAR:
// -FUNCION CHANGEMODE PARA CAMBIO DE TEMA DARK/LIGHT
// -FUNCION CAMBIARCOLOR PARA CAMBIO DE TEMA DARK/LIGHT
// SE CREARON DOS FUNCIONES DISTINTAS YA QUE LA SEGUNDA PUEDE RECIBIR DOS PARAMETROS
// ESTO SIRVE PARA PODER MANTENER EL DARK MODE AUNQUE NAVEGUE POR LA PAGINA SIN INCONVENIENTES.
//- FUNCION PARA BLOQUEAR EL SCROLL CUANDO SE ABRE EL BURGERMENU
//- MOVIMIENTO DE CARROUSEL TANTO TACTIL COMO POR BOTONES
//-FUNCION PARA CONEXION A API PARA TRAER TRENDINGS
//- FUNCION PARA LIMITAR GRID EN CASO DE QUE LA BUSQUEDA TRAIGA MENOS RESULTADOS DE LO ESPERADO.
//-CORRE ALGUNAS GENERALIDADES NECESARIAS PARA EL FUNCIONAMIENTO CORRECTO DE LA SPA
// -EN CASO DE MODIFICAR EL TAMANO DEL VIEWPORT CON LA PAGINA CORRIENDO, LA PAGINA SE RECARGA
var header = document.getElementById("header");
let main = document.getElementById("main");
let footer = document.getElementsByTagName("footer");
let trendSect = document.getElementById("trend-sect");
let mN = document.getElementById("MN");
let AnchormN = document.getElementById("MNA");
let anchorTag = document.getElementsByTagName("a");
let burgerLabel = document.getElementById("burgerMenu");
let p = document.getElementsByTagName('p');


burgerLabel.addEventListener('click', blockScroll);

// ------------HAGO MODO NOCTURNO------------
mN.addEventListener('click', changeMode);
// ---- CREO UN ARRAY CON TODOS LOS ELEMENTOS A MODIFICAR PARA PODER HACER UN SOLO CICLO FOR---

function changeMode() {
    // header[0].classList.toggle('bg-dark');
    //CAMBIO EL COLOR DE FONDO DE HEADER MAIN, FOOTER Y TREND SECTION
    header.classList.toggle('bg-dark');
    main.classList.toggle('bg-dark');
    footer[0].classList.toggle('bg-dark');
    trendSect.classList.toggle('bg-dark2');
    document.getElementById('p-foot').classList.toggle('font-dark');
    //SI ESTOY EN LA SECCION PRINCIPAL, AGREGA EL CAMBIO AL SEARCH DIV
    if (document.getElementById('search-sect') != null) {
        //CAMBIO EL BORDE DE LOS BOTONES
        document.getElementById('search-bar-div').classList.toggle('border-ligth');
        //CAMBIO EL COLOR DE LA LUPA (POR LA PROFUNDIDAD EN LA QUE ESTA DEFINIDA, NO LA AGARRA NINGUN FOR)
        document.getElementById('searchBtn').firstChild.classList.toggle('font-dark')
        //CAMBIA COLOR LETRA DEL INPUT DE BUSQUEDA
        document.getElementById('searchBar').classList.toggle('font-dark');

    }
    //CAMBIO EL COLOR DEL BOTON DE AGREGAR GIF Y DEL LOGO
    document.getElementById('add-gif').classList.toggle('botones-dark');
    document.getElementById('h2-logo').classList.toggle('logo-dark');
    //CAMBIO LAS OPCIONES DEL NAVBAR

    for (i = 0; i < anchorTag.length; i++) {
        anchorTag[i].classList.toggle('font-dark');

    }
    cambiaColor(0, document.getElementsByTagName('section').length);
    // SI EXISTE LA BARRA DE BUSQUEDA EN HEADER, CAMBIA SU COLOR
    if (document.getElementById('head-search-bar-div') != null) {
        document.getElementById('head-search-bar-div').classList.toggle('border-ligth');
        document.getElementById('searchBtnHeader').firstChild.classList.toggle('font-dark');
        document.getElementById('searchBarHeader').classList.toggle('font-dark');
    }
    if (screen.width < 800 && Array.from(header.classList).indexOf('bg-dark') != -1) {
        document.getElementById('ulnavBar').style.background = 'rgba(34, 35, 38, 0.9)'
    } else if (screen.width < 800) {
        document.getElementById('ulnavBar').style.background = 'rgba(87, 46, 229, 0.9)'

    }

    setTimeout(function () {
        if (Array.from(header.classList).indexOf('bg-dark') != -1) {
            AnchormN.textContent = 'MODO DIURNO';

        } else { AnchormN.textContent = 'MODO NOCTURNO'; }
    }, 100)
}

function cambiaColor(desde, cuantasSect) {
    let sections = document.getElementsByTagName('section');
    for (i = desde; i < cuantasSect; i++) {
        for (j = 0; j < sections[i].children.length; j++) {
            sections[i].children[j].classList.toggle('font-dark');
            if (sections[i].children[j].type == 'submit') {
                sections[i].children[j].classList.toggle('botones-dark');
            };

            if (sections[i].children[j].children.length != 0) {
                for (k = 0; k < sections[i].children[j].children.length; k++) {
                    sections[i].children[j].children[k].classList.toggle('font-dark');
                    if (sections[i].children[j].children[k].type == 'submit') {
                        sections[i].children[j].classList.toggle('botones-dark');
                    };
                }
            }
        }
    }
}

//---------- CREO FUNCIONES PARA BLOQUEAR SCROLL AL ABRIR EL MENU MOBILE
function blockScroll() {
    if (!document.getElementById("menuinput").checked) {
        disableScroll()
    } else if (document.getElementById("menuinput").checked) {
        window.onscroll = false;
    }
}


let li1 = document.getElementById('li1');
let li2 = document.getElementById('li2');
let li3 = document.getElementById('li3');
let li4 = document.getElementById('li4');
let li5 = document.getElementById('li5');
let flechasIzqDer = document.getElementsByClassName('square-i');
var ulCarrousel = document.getElementById('ul-carrousel');


// DETECTANDO SI EL SWIPE ES DERECHA O IZQUIERDA
// PRIMERO AGARRO EL EVENTO TOUCHSTART Y GUARDO LA POSICION X EN UNA VARIABLE 
let inicioTouch, endTouch;
ulCarrousel.addEventListener('touchstart', function () {
    inicioTouch = event.targetTouches[0].screenX;
})

// SEGUNDO AGARRO EL EVENTO TOUCHEND Y GUARDO LA POSICION X EN OTR VARIABLE TAMBIEN COMPARO 
// LAS DOS VARIABLES, SI X INICIO ES MAYOR A X FIN, EL MOVIMIENTO FUE A LA IZQUIERDA Y VICEVERSA.

ulCarrousel.addEventListener('touchend', function () {
    endTouch = event.changedTouches[0].screenX;
    if (inicioTouch > endTouch) {
        moverCarrouselDer();
    } else if (inicioTouch < endTouch) {
        moverCarrouselIzq();
    }
})


flechasIzqDer[0].addEventListener('click', moverCarrouselIzq);
flechasIzqDer[1].addEventListener('click', moverCarrouselDer);



//////HAGO LA BUSQUEDA PARA GENERAR EL CARROUSEL

let resultadoTrending;
function traeTrendings() {
    Giphy.trendingAsync(function (arrayResults) {
        resultadoTrending = arrayResults;
        li1.firstElementChild.firstElementChild.src = resultadoTrending[1].images.original.mp4;
        li2.firstElementChild.firstElementChild.src = resultadoTrending[2].images.original.mp4;
        li3.firstElementChild.firstElementChild.src = resultadoTrending[3].images.original.mp4;
        li4.firstElementChild.firstElementChild.src = resultadoTrending[4].images.original.mp4;
        li5.firstElementChild.firstElementChild.src = resultadoTrending[5].images.original.mp4;
        //les pongo id dinamico para poder generar favoritos y gifos max
        li1.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel}  `;
        li2.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 1}`;
        li3.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 2}`;
        li4.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 3}`;
        li4.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 4}`;
    })
}

let moveImgCarrousel = 1;

function moverCarrouselIzq() {
    if (moveImgCarrousel <= 1) {
        document.getElementById('izq-trending').style.visibility = 'hidden';
        moveImgCarrousel = 0;
        // moveImgCarrousel = resultadoTrending.length-1;
    } else {
        moveImgCarrousel -= 1;
    }
    if (moveImgCarrousel <= resultadoTrending.length - 2) {
        document.getElementById('der-trending').style.visibility = 'visible';
    }
    if (moveImgCarrousel >= 20) {
        li1.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel].images.original.mp4;
        li2.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 1].images.original.mp4;
        li3.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 2].images.original.mp4;
        //les pongo id dinamico para poder generar favoritos y gifos max
        li1.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel}  `;
        li2.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 1}`;
        li3.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 2}`;

    } else {
        li1.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel].images.original.mp4;
        li2.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 1].images.original.mp4;
        li3.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 2].images.original.mp4;
        li4.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 3].images.original.mp4;
        li5.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 4].images.original.mp4;
        //les pongo id dinamico para poder generar favoritos y gifos max
        li1.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel}  `;
        li2.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 1}`;
        li3.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 2}`;
        li4.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 3}`;
        li5.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 4}`;
    }
}
function moverCarrouselDer() {
    if (moveImgCarrousel >= resultadoTrending.length - 5) {
        document.getElementById('der-trending').style.visibility = 'hidden';
        moveImgCarrousel = resultadoTrending.length - 3;

    } else {
        moveImgCarrousel += 1;
    }
    if (moveImgCarrousel >= 1) {
        document.getElementById('izq-trending').style.visibility = 'visible';
    }
    if (moveImgCarrousel >= 20) {
        li1.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel].images.original.mp4;
        li2.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 1].images.original.mp4;
        li3.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 2].images.original.mp4;
        //les pongo id dinamico para poder generar favoritos y gifos max
        li1.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel}  `;
        li2.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 1}`;
        li3.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 2}`;

    } else {
        li1.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel].images.original.mp4;
        li2.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 1].images.original.mp4;
        li3.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 2].images.original.mp4;
        li4.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 3].images.original.mp4;
        li5.firstElementChild.firstElementChild.src = resultadoTrending[moveImgCarrousel + 4].images.original.mp4;
        //les pongo id dinamico para poder generar favoritos y gifos max
        li1.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel}  `;
        li2.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 1}`;
        li3.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 2}`;
        li4.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 3}`;
        li5.firstElementChild.children[1].firstElementChild.id = `fav-trend-${moveImgCarrousel + 4}`;
    }
}

function limitaGrid(gridCtn,comparador){
    if(screen.width>=800){
        if (comparador <= 4) {
            gridCtn.style.gridTemplateRows = '200px'
        }
        else if (comparador <= 8) {
            gridCtn.style.gridTemplateRows = 'repeat(2, 200px)'
        } else { gridCtn.style.gridTemplateRows = 'repeat(3, 200px)' }}
}

window.onresize = function(){
        location.reload();
    
}
setTimeout(function () {
    traeTrendings();
    // LE AGREGO EL EVENT LISTENER DE FAVORITOS A LOS 5 BOTONES DEL CARROUSEL
    li1.firstElementChild.children[1].firstElementChild.addEventListener('click', agregaFav);
    li2.firstElementChild.children[1].firstElementChild.addEventListener('click', agregaFav);
    li3.firstElementChild.children[1].firstElementChild.addEventListener('click', agregaFav);
    li4.firstElementChild.children[1].firstElementChild.addEventListener('click', agregaFav);
    li5.firstElementChild.children[1].firstElementChild.addEventListener('click', agregaFav);
    // LE AGREGO EL EVENT LSITENER DE trendgifMax A LOS 5 BOTONES DEL CARROUSEL
    li1.firstElementChild.children[1].children[2].addEventListener('click', trendgifMax)
    li2.firstElementChild.children[1].children[2].addEventListener('click', trendgifMax)
    li3.firstElementChild.children[1].children[2].addEventListener('click', trendgifMax)
    li4.firstElementChild.children[1].children[2].addEventListener('click', trendgifMax)
    li5.firstElementChild.children[1].children[2].addEventListener('click', trendgifMax)
 
}, 200);