let favSectButton = document.getElementById('fav');

favSectButton.addEventListener('click', abreFavoritos);


function abreFavoritos() {
if(document.getElementById('favSect')==null){

    lupaOculta.removeEventListener('click', creaLaBusqueda);
    searchBarinput.removeEventListener('input',creaAutoComplete);
    
    var favArray = localStorage.getItem('favoritos');
    // if(document.getElementById('sectGifsBusqueda')!=null){document.getElementById('sectGifsBusqueda').remove();}
    //SI EXISTIO UNA BUSQUEDA LA BORRA
    (document.getElementById('sectGifsBusqueda') != null) ? document.getElementById('sectGifsBusqueda').remove() : {};
    //SI LA SECCION CON SEARCH BAR ESTA EN PANTALLA, LA ELIMINA
    (document.getElementById('search-sect') != null) ? document.getElementById('search-sect').remove() : {};
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
    favSect.appendChild(favH2);

    if (JSON.parse(favArray) === null) {
       
        let divFav = document.createElement('div');
        favSect.appendChild(divFav);
        let heartFaceFav = document.createElement('img');
        heartFaceFav.src = 'assets/icon-fav-sin-contenido.svg';
        divFav.appendChild(heartFaceFav);
        let guardaTuPrimer = document.createElement('p');
        guardaTuPrimer.textContent = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';
        divFav.appendChild(guardaTuPrimer);
        // let favVerMas = document.createElement('button');
        // favVerMas.textContent = 'Ver mas'
        // favSect.appendChild(favVerMas);
    } else {
        favSect.classList.add('sectContGifs');
        let div = document.createElement('div');
            div.id = 'div-cont-gifs-fav';
            div.classList.add('div-cont-gifs');
            favSect.appendChild(div);
        for (i = 0; i < JSON.parse(favArray).length; i++) {

            creaLosGifs(JSON.parse(favArray)[i],"div-cont-gifs-fav");
        }
    }}
}



var gifFavoritos = [];
function agregaFav() {

    let indice = this.id.substr(10, this.id.length);
    // console.log(this);
    this.download=busquedaAsyncResult[indice].images.original.mp4
    if (gifFavoritos.indexOf(busquedaAsyncResult[indice]) == -1) {
        
        gifFavoritos.push(busquedaAsyncResult[indice]);
        //    console.log(busquedaAsyncResult[indice]);
        // setTimeout(function(){localStorage.setItem('favoritos',JSON.stringify(gifFavoritos));},100)
        localStorage.setItem('favoritos', JSON.stringify(gifFavoritos));
    }

}
