// EN ESTE ARCHIVO PODEMOS ENCONTRAR:
//FUNCION ABREFAVORITOS QUE CREA LA SECCION DE FAVORITOS AL MOMENTO DE APRETAR EL BOTON PARA ENTRAR A LA SECCION
//FUNCION QUE AGREGA Y ELIMINA FAVORITOS
//FUNCION QUE MANTIENE LOS FAVORITOS DE SESIONES ANTERIORES

let favSectButton = document.getElementById('fav');

favSectButton.addEventListener('click', abreFavoritos);


var favArray = JSON.parse(localStorage.getItem('favoritos')); //FAVORITOS DE CARGAS DE PAGINA ANTERIORES

var gifFavoritos = [];// ARRAY DONDE CONTIENE LOS FAVORITOS 

// ESTA FUNCION AGREGUA AL ARRAY DE FAV ACTUALES, LOS DE SESIONES ANTERIORES
function mantieneFavAnteriores() {
    if (favArray != null) {
        for (i = 0; i < favArray.length; i++) {
            gifFavoritos.push(favArray[i]);
        }
    }
}

mantieneFavAnteriores(); // corro la funcion para cuando, me actualice gifFavoritos.


//ABRE LA PAGINA DE FAVORITOS
function abreFavoritos() {
    window.scrollTo(0, 0);
    if (document.getElementById('favSect') == null) {

        // lupaOculta.removeEventListener('click', creaLaBusqueda);
        // searchBarinput.removeEventListener('input', creaAutoComplete);

        favArray = localStorage.getItem('favoritos');

        // if(document.getElementById('sectGifsBusqueda')!=null){document.getElementById('sectGifsBusqueda').remove();}
        //SI EXISTIO UNA BUSQUEDA LA BORRA
        (document.getElementById('sectGifsBusqueda') != null) ? document.getElementById('sectGifsBusqueda').remove() : {};
        //SI LA SECCION CON SEARCH BAR ESTA EN PANTALLA, LA ELIMINA
        (document.getElementById('search-sect') != null) ? document.getElementById('search-sect').remove() : {};
        //SI LA SECCION MIS GIFOS ESTA EN PANTALLA, LA ELIMINA        
        (document.getElementById('misGifosSect') != null) ? document.getElementById('misGifosSect').remove() : {};
        //SI EXISTE LA SEARCH BAR EN EL HEADER, LA BORRA
        (document.getElementById('head-search-bar-div') != null) ? document.getElementById('head-search-bar-div').remove() : {};
        //SI LA SECCION ADD GIF ESTA EN PANTALLA, LA ELIMINA        
        // (document.getElementById('addGifSect') != null) ? document.getElementById('addGifSect').remove() : {};
        if (document.getElementById('addGifSect') != null) {
            document.getElementById('addGifSect').remove();
            trendSect.style.display = 'flex'
        }
        //     let searchSectRemove = document.getElementById('search-sect');
        //    searchSectRemove.remove();


        let favSect = document.createElement('section');
        favSect.id = "favSect";
        main.insertBefore(favSect, trendSect);
        let favHeart = document.createElement('img');
        favHeart.src = 'assets/icon-favoritos.svg'
        favSect.appendChild(favHeart);
        let favH2 = document.createElement('h2');
        favH2.textContent = 'Favoritos';
        changeTags.push(favH2);
        favSect.appendChild(favH2);

        // SI  NO  HAY FAVORITOS GUARDADOS, MUESTRA PANTALLA DE NO HAY FAVORITOS
        if (JSON.parse(favArray) === null || JSON.parse(favArray).length == 0) {

            let divFav = document.createElement('div');
            favSect.appendChild(divFav);
            divFav.id = 'divFavEmpty';
            let heartFaceFav = document.createElement('img');
            heartFaceFav.src = 'assets/icon-fav-sin-contenido.svg';
            divFav.appendChild(heartFaceFav);
            let guardaTuPrimer = document.createElement('p');
            guardaTuPrimer.textContent = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';
            divFav.appendChild(guardaTuPrimer);

        } else {
            //SI HAY FAVORITOS GUARDADOS PREPARA TODO PARA CREAR LOS GIFS
            favSect.classList.add('sectContGifs');
            let div = document.createElement('div');
            div.id = 'div-cont-gifs-fav';
            div.classList.add('div-cont-gifs');
            favSect.appendChild(div);
            // MUESTRA EN PRINCIPIO MAXIMO 12 GIFS
            // EN CASO QUE VENGAN MENOS DE 12, ACOMODA EL GRID PARA QUE NO EXISTAN ESPACIOS EN BLANCO
            limitaGrid(div, JSON.parse(favArray).length);
            let limiteCreacion = Math.min(JSON.parse(favArray).length, 12);

            for (i = 0; i < limiteCreacion; i++) {
                creaLosGifs(JSON.parse(favArray)[i], "div-cont-gifs-fav");
            }
            // EN CASO DE QUE EXISTAN MAS DE 12 GIFS, MUESTRA BOTO VER MAS
            if (JSON.parse(favArray).length > 12) {
                let verMas = document.createElement('button');
                verMas.textContent = 'Ver Mas';
                verMas.id = 'verMas';
                favSect.appendChild(verMas);
                verMas.addEventListener('click', verMasFuncFav);

            }
        }
        let indiceColor = Array.from(document.getElementById('MNA').classList).indexOf('font-dark')
        if (indiceColor != -1) {
            cambiaColor(0, 1);
        }
    }

}



// AGREGA A FAVORITOS CUANDO APRETO EL BOTON DEL CORAZON
function agregaFav() {
    this.classList.toggle('far');
    this.classList.toggle('fas');

    let indice = parseInt(this.id.substr(10, this.id.length));
    // DEPENDE EN QUE PANTALLA ESTOY BUSQUEDA O FAVORITOS, EL COMPORTAMIENTO DEL BOTON.
    //HAGO DOS VALIDACIONES PARA VER QUE NO ESTE EN FAVORITOS
    if (document.getElementById('search-sect') != null && this.id.substr(0, 9) != "fav-trend") {// CUANDO ESTOY EN LA PANTALLA DE BUSQUEDA
        if (gifFavoritos.indexOf(busquedaAsyncResult[indice]) == -1) {
            let segundaValidacion = true;
            let indiceAborrar;

            for (i = 0; i < gifFavoritos.length; i++) {
                if (gifFavoritos[i].id == busquedaAsyncResult[indice].id) {
                    segundaValidacion = false;
                    indiceAborrar = i;
                }
            }
            if (segundaValidacion) {
                gifFavoritos.push(busquedaAsyncResult[indice]);
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));

            } else {
                gifFavoritos.splice(indiceAborrar, 1)
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));

            }
        }
    } else if (document.getElementById('favSect') != null && this.id.substr(0, 9) != "fav-trend") { // CUANDO ESTOY EN LA PANATALLA FAVORITOS

        let ctnGifFav = document.getElementById(`span-cnt-${indice}`);
        let urlGif = ctnGifFav.firstChild.src;
        let indiceAborrar;


        for (i = 0; i < gifFavoritos.length; i++) {
            if (gifFavoritos[i].images.original.mp4 == urlGif) {
                indiceAborrar = i;

            }
        }
        gifFavoritos.splice(indiceAborrar, 1)
        localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
        ctnGifFav.remove();
        if (document.getElementById('div-cont-gifs-fav').children.length == 0) {
           //SI BORRO TODOS LOS FAVORITOS, VUELVE A CREAR LA SECCION.
            document.getElementById('favSect').remove();
           abreFavoritos();
           
        }


    } else if (this.id.substr(0, 9) == "fav-trend" ||this.id.substr(0, 9) == "max-trend") {// CUANDO QUIERO GUARDAR DESDE LA SECCION TRENDINGS

        if (gifFavoritos.indexOf(resultadoTrending[indice]) == -1 && gifFavoritos.length != 0) {
            let segundaValidacion = true;
            let indiceAborrar;
            
            for (i = 0; i < gifFavoritos.length; i++) {
                if (gifFavoritos[i].id == resultadoTrending[indice].id) {
                    segundaValidacion = false;
                    indiceAborrar = i;
                }
            }
            if (segundaValidacion) {
                gifFavoritos.push(resultadoTrending[indice]);
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
              if( document.getElementById('favSect')!=null){
                document.getElementById('favSect').remove();
                abreFavoritos();
                window.scrollTo(0, document.getElementById('trend-sect').offsetTop-30);}
                

            } else {
                gifFavoritos.splice(indiceAborrar, 1);
                localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
                

            }
        } else if (gifFavoritos.length == 0) {

            gifFavoritos.push(resultadoTrending[indice]);
            localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
        }

    }


}
