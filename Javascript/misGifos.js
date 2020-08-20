//EN ESTE ARCHIVO PODREMOS ENCONTRAR:
//- CREACION DE SECCION MIS GIFOS A LA HORA DE APRETAR EL BOTON CORRESPONDIENTE A LA SECCION
// LA FUNCION CREA DIFERENTES VISTAS DEPENDIENDO SI EXISTEN O NO GIFOS ALMACENADOS

let misGifosSectButton = document.getElementById('mi-gif');

misGifosSectButton.addEventListener('click', abreMisGifos);



//ABRE LA PAGINA DE FAVORITOS
function abreMisGifos() {

    if (document.getElementById('misGifosSect') == null) {
        window.scrollTo(0,0);

        misGifosArray = JSON.parse(localStorage.getItem('idsSubidos')); //FAVORITOS DE CARGAS DE PAGINA ANTERIORES

        // favArray = localStorage.getItem('favoritos');
        //SI EXISTIO UNA BUSQUEDA LA BORRA
        (document.getElementById('sectGifsBusqueda') != null) ? document.getElementById('sectGifsBusqueda').remove() : {};
        //SI LA SECCION CON SEARCH BAR ESTA EN PANTALLA, LA ELIMINA
        (document.getElementById('search-sect') != null) ? document.getElementById('search-sect').remove() : {};
        //SI LA SECCION FAVORITOS ESTA EN PANTALLA, LA ELIMINA
        (document.getElementById('favSect') != null) ? document.getElementById('favSect').remove() : {};
        //SI EXISTE LA SEARCH BAR EN EL HEADER, LA BORRA
        (document.getElementById('head-search-bar-div') != null) ? document.getElementById('head-search-bar-div').remove() : {};

        if (document.getElementById('addGifSect') != null) {
            document.getElementById('addGifSect').remove();
             trendSect.style.display = 'flex'}

        //     let searchSectRemove = document.getElementById('search-sect');
        //    searchSectRemove.remove();
        let misGifosSect = document.createElement('section');
        misGifosSect.id = "misGifosSect";
        main.insertBefore(misGifosSect, trendSect);
        let gifosFace = document.createElement('img');
        gifosFace.src = 'assets/icon-mis-gifos.svg'
        misGifosSect.appendChild(gifosFace);
        let misGifosH2 = document.createElement('h2');
        misGifosH2.textContent = 'Mis GIFOS';
        misGifosSect.appendChild(misGifosH2);

        // SI  NO  HAY MISGIFOS GUARDADOS, MUESTRA PANTALLA DE NO HAY MIS GIFOS
        // VER COMO HACER LA VALIDACION
        if (misGifosArray === null || misGifosArray.length == 0) {

            let divMisGifos = document.createElement('div');
            misGifosSect.appendChild(divMisGifos);
            divMisGifos.id = 'divMisGifosEmpty';
            let headFaceMis = document.createElement('img');
            headFaceMis.src = 'assets/icon-mis-gifos-sin-contenido.svg';
            divMisGifos.appendChild(headFaceMis);
            let guardaTuPrimer = document.createElement('p');
            guardaTuPrimer.textContent = '"¡Animate a crear tu primer GIFO!"';
            divMisGifos.appendChild(guardaTuPrimer);

        } else {
            console.log('hay gifos guardados');
        
        //     //SI HAY GIFOS GUARDADOS PREPARA TODO PARA CREAR LOS GIFS
        misGifosSect.classList.add('sectContGifs');
        let div = document.createElement('div');
        div.id = 'div-cont-gifs-fav';
        div.classList.add('div-cont-gifs');
        misGifosSect.appendChild(div);
        // MUESTRA EN PRINCIPIO MAXIMO 12 GIFS
        // EN CASO QUE VENGAN MENOS DE 12, ACOMODA EL GRID PARA QUE NO EXISTAN ESPACIOS EN BLANCO
        limitaGrid(div, misGifosArray.length);
        let limiteCreacion = Math.min(misGifosArray.length, 12);
        let idsComas = misGifosArray.join();
        /// HAGO LA LLAMADA A LA API Y ACOMODO LOS GIFS QUE LLEGAN         
        Giphy.gifosAsync(idsComas, function (arrayResults) {
            console.log(arrayResults);
            for (i = 0; i < limiteCreacion; i++) {
                // function creaLosGifs(srcParam, divDonde)

                creaLosGifs(arrayResults[i], "div-cont-gifs-fav");
            }
            var arrayResultsvar = arrayResults;
        });
        // EN CASO DE QUE EXISTAN MAS DE 12 GIFS, MUESTRA BOTO VER MAS
        if (misGifosArray.length > 12) {
            let verMas = document.createElement('button');
            verMas.textContent = 'Ver Mas';
            verMas.id = 'verMas';
            misGifosSect.appendChild(verMas);
            verMas.addEventListener('click', verMasFuncMis);

        }}
    }
    let indiceColor = Array.from(document.getElementById('MNA').classList).indexOf('font-dark')
    if(indiceColor != -1){
        cambiaColor(0,1);
    }
}
