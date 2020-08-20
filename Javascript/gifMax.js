// EN ESTE ARCHIVO PODEMOS ENCONTRAR:
//FUNCION GIFMAX QUE CREA LAS CONDICIONES PARA MOSTRAR EL GIF MAX, Y CLONA EL CONTEXTO DEL GIF A MAXIMIZAR
// FUNCION QUE DESHABIITA SCROLL Y OTRO QUE VUELVE A HABILITARLO
// FUNCIONES QUE LE DAN MOVIMIENTO DE CARROUSEL AL GIFMAX
// FUNCION PARA MAXIMIZAR LOS TRENDINGS, SIN CARROUSEL
var indice;

function gifMax() {

    // console.log(this.id);
    if (window.innerWidth > 800) { indice = parseFloat(this.id.substr(11, this.id.length)) };
    if (window.innerWidth <= 800) { indice = parseFloat(this.id.substr(9, this.id.length)) };
    // console.log(indice);
    let main = document.getElementById('main');
    let sectMax = document.createElement('section');//creamos seccion contenedora
    sectMax.id = 'max-section';
    let ctnGifsearch;
    if (document.getElementById('div-cont-gifs-search') != null&&indice!=NaN) {
        ctnGifsearch = document.getElementById('div-cont-gifs-search');
    }
    else if (document.getElementById('div-cont-gifs-fav') != null&&indice!=NaN) {
        ctnGifsearch = document.getElementById('div-cont-gifs-fav');
        busquedaAsyncResult = gifFavoritos;
    }else if(indice!=NaN){
        ctnGifsearch = document.getElementById('ul-carrousel');
        
    }
    // esto es nuevo
    let data = ctnGifsearch.children[indice].cloneNode(true); //video
    let video = data.firstChild.cloneNode(true); //GIF
    let x = document.createElement('i');// CRUZ PARA CERRAR GIFMAX
    x.classList.add('fa-times');
    x.classList.add('fas');
    let divP = data.lastChild;
    divP.id = 'div-ctn-user-gifName';
    let divI = data.children[1];
    let ctnX = document.createElement('div');
    let ctnVideo = document.createElement('div'); // creo contenedor para poder manipular el video mas facil
    let spanVideo = document.createElement('span'); // creo contenedor para poder manipular el video mas facil
    let ctnIp = document.createElement('div'); // creo contenedor para agrupar los simbolos y los p
    let left = document.createElement('i');
    let right = document.createElement('i');
    main.appendChild(sectMax);
    sectMax.appendChild(ctnX);
    sectMax.appendChild(ctnVideo);
    sectMax.appendChild(ctnIp);
    ctnX.appendChild(x);
    ctnVideo.appendChild(left);
    ctnVideo.appendChild(spanVideo);
    ctnVideo.appendChild(right);
    spanVideo.appendChild(video);
    ctnIp.appendChild(divP);
    ctnIp.appendChild(divI);
    ctnVideo.id = 'ctnVideo';
    video.id = 'videoMax';
    ctnX.id = 'ctnX';
    ctnIp.id = 'ctnip';
    divI.classList.add('i-div');
    divP.classList.add('i-p-div');
    left.classList.add('fas','fa-chevron-left');
    right.classList.add('fas','fa-chevron-right');
    left.id = 'leftChevron';
    right.id = 'rightChevron';

    x.addEventListener('click', cierraMax);
    sectMax.addEventListener('scroll', disableScroll());// DESHABLITO LA OPCION DE SCROLL
    left.addEventListener('click', carrouselMaxIzq);
    right.addEventListener('click', carrouselMaxDer);

    divI.firstChild.addEventListener('click', agregaFav);
    if (busquedaAsyncResult.length == 1) {
        left.style.visibility = 'hidden';
        right.style.visibility = 'hidden';
    }
    else if (indice == 0) {
        left.style.visibility = 'hidden';
    } else if (indice == busquedaAsyncResult.length - 1) {
        right.style.visibility = 'hidden';
    }
}

function disableScroll() {
    var x = 0;
    var y = 0;
    window.scrollTo(x, y);
    window.onscroll = function () { window.scrollTo(x, y) };
}

function cierraMax() {
    document.getElementById('max-section').remove();
    window.onscroll = false;
}


function carrouselMaxIzq() {
    console.log(indice);
    let video = document.getElementById('videoMax');
    let der = document.getElementById('rightChevron');
    let izq = document.getElementById('leftChevron');
    if (indice == 1) {
        izq.style.visibility = 'hidden';

    } else if (indice == busquedaAsyncResult.length - 1) {
        der.style.visibility = 'visible';

    }
    indice -= 1;

    let user = document.getElementById('div-ctn-user-gifName').firstChild;
    let gifName = document.getElementById('div-ctn-user-gifName').lastChild;
    video.src = busquedaAsyncResult[indice].images.original.mp4;
    user.textContent = busquedaAsyncResult[indice].username;
    gifName.textContent = busquedaAsyncResult[indice].title;
    // actualiza el id del contenedors del boton FAV(heart) para que tenga el mismo indice
    let ctnI = document.getElementById('ctnip').lastChild;
    ctnI.firstChild.id = `fav-heart-${indice}`;

}
function carrouselMaxDer() {
    console.log(indice);

    let video = document.getElementById('videoMax');
    let izq = document.getElementById('leftChevron');
    let der = document.getElementById('rightChevron');

    if (indice == 0) {
        izq.style.visibility = 'visible'
    } else if (indice == busquedaAsyncResult.length - 2) {
        der.style.visibility = 'hidden';
    }

    indice += 1;
    let user = document.getElementById('div-ctn-user-gifName').firstChild;
    let gifName = document.getElementById('div-ctn-user-gifName').lastChild;
    video.src = busquedaAsyncResult[indice].images.original.mp4;
    user.textContent = busquedaAsyncResult[indice].username;
    gifName.textContent = busquedaAsyncResult[indice].title;
    // actualiza el id del contenedors del boton FAV(heart) para que tenga el mismo indice
    let ctnI = document.getElementById('ctnip').lastChild;
    ctnI.firstChild.id = `fav-heart-${indice}`;
    ctnI.lastChild.download = busquedaAsyncResult[indice].images.original.mp4 ;

}


///////TRENDING MAX
function trendgifMax() {

    console.log(this.parentElement.parentElement.children[0]);
     
    let main = document.getElementById('main');
    let sectMax = document.createElement('section');//creamos seccion contenedora
    sectMax.id = 'max-section';
    let video = this.parentElement.parentElement.children[0].cloneNode(true); //GIF
    let x = document.createElement('i');// CRUZ PARA CERRAR GIFMAX
    x.classList.add('fa-times');
    x.classList.add('fas');
    let divP = this.parentElement.parentElement.children[2].cloneNode(true);
    divP.id = 'div-ctn-user-gifName';
    let divI = this.parentElement.parentElement.children[1].cloneNode(true);;
    let ctnX = document.createElement('div');
    let ctnVideo = document.createElement('div'); // creo contenedor para poder manipular el video mas facil
    let spanVideo = document.createElement('span'); // creo contenedor para poder manipular el video mas facil
    let ctnIp = document.createElement('div'); // creo contenedor para agrupar los simbolos y los p
    main.appendChild(sectMax);
    sectMax.appendChild(ctnX);
    sectMax.appendChild(ctnVideo);
    sectMax.appendChild(ctnIp);
    ctnX.appendChild(x);
    ctnVideo.appendChild(spanVideo);
    spanVideo.appendChild(video);
    ctnIp.appendChild(divP);
    ctnIp.appendChild(divI);
    ctnVideo.id = 'ctnVideo';
    video.id = 'videoMax';
    ctnX.id = 'ctnX';
    ctnIp.id = 'ctnip';
    divI.classList.add('i-div');
    divP.classList.add('i-p-div');
    

    x.addEventListener('click', cierraMax);
    sectMax.addEventListener('scroll', disableScroll());// DESHABLITO LA OPCION DE SCROLL
    divI.children[0].addEventListener('click',agregaFav);

}