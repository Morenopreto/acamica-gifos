// EN ESTE ARCHIVO PODEMOS ENCONTRAR:
//-FUNCION PARA CREACION DE BUSQUEDA AL PRESIONAR LUPA O ALUNGA DE LAS OPCIONES DE AUTOCOMPLETE
//-FUNCION (CREALOSGIFS) PARA CREAR, CON DOS PARAMETROS, EL CONTENEDOR DE LOS GIFS QUE SE BUSQUEN
// ESTEN ALMACENADOS EN FAVORITOS O HAYAN SIDO CREADOS Y ESTEN ALMACENADOS EN MIS GIFOS.

// BUSQUEDA DE GIF CON LA BARRA SEARCH Y LOS MUESTRA 4X3.
var btnBusqueda = document.getElementById('searchBtn');
var lupaOculta = document.getElementById('lupaOculta');
var searchX = document.getElementById('searchX');

let busquedaAsyncResult;
let guardaArray;// creo que se puede borrar


lupaOculta.addEventListener('click', creaLaBusqueda);


// SIRVE PARA, TENIENDO KEYWORDS EN EL INPUT DE BUSQUEDA, GENERAR ESA BUSQUEDA CON LA API.
function creaLaBusqueda() {
    cuantosVerMas = 0;
    if (document.getElementById('divCtrPredictivo') != null) {
        document.getElementById('divCtrPredictivo').remove();
    }
    if(document.getElementById('head-search-bar-div')==null){
    keyword = searchBarinput.value;
    }
    else {keyword = document.getElementById('searchBarHeader').value }
    let sectContenedor = document.createElement('section');
    sectContenedor.id = 'sectGifsBusqueda';
    sectContenedor.classList.add('sectContGifs');
    document.getElementById('main').insertBefore(sectContenedor, document.getElementById('trend-sect'));

    Giphy.busquedaAsync(keyword, function (arrayResults) {

        
        
        busquedaAsyncResult = arrayResults;
        (document.getElementById('h2-keyword') != null) ? document.getElementById('sectGifsBusqueda').remove() : {};

        //CREA LA LINEA QUE SEPARA EL OTRO SECTION
        let line = document.createElement('hr');
        line.id = 'grey-line';
        sectContenedor.appendChild(line);
        //CREA EL TEXTO CON EL VALUE DEL SEARCH
        let headingkeyword = document.createElement('h2');
        headingkeyword.id = 'h2-keyword'
        headingkeyword.textContent = `${(keyword.slice(0, 1)).toUpperCase()}${(keyword.slice(1, keyword.length)).toLowerCase()}`;

        sectContenedor.appendChild(headingkeyword);


        if (arrayResults.length != 0) {
            //SI EXISTE UNA BUSQUEDA ANTERIOR, PRIMERO BORRA PARA DESPUES CREAR; 
            let div = document.createElement('div');
            div.id = 'div-cont-gifs-search';
            div.classList.add('div-cont-gifs');
            sectContenedor.appendChild(div);
            // console.log(screen.width);

            //LIMITO EL GRID PARA QUE SI VIENEN MENOS RESULTADOS, NO QUEDE UN ESPACIO BLANCO           
            limitaGrid(div,arrayResults.length);
            //FIN DE LIMTANTE
            // CREO UNA VARIABLE PARA MOSTRAR COMO MAXIMO 12 Y COMO MINIMO, LA CANTIDAD QUE TRAIGA
            //EL ARRAY
            let frenoCreacion = Math.min(arrayResults.length, 12);

            for (i = 0; i < frenoCreacion; i++) {
                creaLosGifs(arrayResults[i], 'div-cont-gifs-search');
               }
            if(arrayResults.length>12){
                let verMas = document.createElement('button');
            verMas.textContent = 'Ver Mas';
            verMas.id = 'verMas';
            sectGifsBusqueda.appendChild(verMas);
            verMas.addEventListener('click', verMasFunc);

            }
            let indiceColor = Array.from(document.getElementById('MNA').classList).indexOf('font-dark')
        if(indiceColor != -1){
            cambiaColor(1,2);
        }

            // CHEQUEAR FUNCION VER MAS
        } else {
            let img = document.createElement('img');
            img.src = 'assets/icon-busqueda-sin-resultado.svg'
            img.id = 'ouch';
            sectContenedor.appendChild(img);
            let h2 = document.createElement('h2');
            h2.textContent = 'Intenta con otra búsqueda.';
            h2.id ='IntentaOtra';
            sectContenedor.appendChild(h2);

        }

    }
    )
    // vuelvo a dejar el input como al principio
    btnBusqueda.style.display = 'inline-block';
    lupaOculta.style.display = 'none';
    searchX.style.display = 'none';
    searchBarinput.style.borderBottom = '0px';
    searchBarinput.value = '';
    
}

// EXISTE UN CONTENDOR Y CON LA FUNCION CREO LA ESTRUCTURA DEL CONTENIDO DE ADENTRO
function creaLosGifs(srcParam, divDonde) {
    let div = document.getElementById(divDonde);
    let source = srcParam.images.original.mp4;
    let span = document.createElement('span');
    span.id ='span-cnt-'+i;
    div.appendChild(span);
    span.style.backgroundImage = 'url(assets/notAvailable.jpg)';
    span.style.backgroundSize = 'contain';
    span.classList.add('span-gifs-hover');
    let mp4 = document.createElement('video');
    mp4.src = source;
    mp4.autoplay = 'true';
    mp4.loop = 'true';
    span.appendChild(mp4);
    //CREA TODO LO NECESARIO PARA EL HOVER
    //CREA LOS i CON LOS SIMBOLOS 
    let divI = document.createElement('div');
    divI.classList.add('i-div');
    span.appendChild(divI);
    let i1 = document.createElement('i');
    let i2 = document.createElement('i');
    let ai2 = document.createElement('a');
    let i3 = document.createElement('i');
    if(document.getElementById('favSect')!=null){
        i1.classList.add('fas', 'fa-heart');

    }else{
        i1.classList.add('far', 'fa-heart');
    }
    i2.classList.add('fas', 'fa-download');
    i3.classList.add('fas', 'fa-expand-alt');
    divI.appendChild(i1);
    divI.appendChild(ai2);
    ai2.appendChild(i2);
    ai2.href = '';
    ai2.download = srcParam.images.original.mp4;
    divI.appendChild(i3);
    i1.id = 'fav-heart-' + i;
    i2.id = 'fav-down-' + i;
    i3.id = 'fav-expand-' + i;
    // CREA LOS P
    let divP = document.createElement('div');
    divP.classList.add('i-p-div');
    span.appendChild(divP);
    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    label1.textContent = srcParam.username;
    label2.textContent = srcParam.title;
    divP.appendChild(label1);
    divP.appendChild(label2);
    //SOLO PARA CUANDO ESTA EN HP!
    // if (document.getElementById('search-sect') != null) {
    i1.addEventListener('click', agregaFav);
    // }else if(document.getElementById('favSect') != null){
        
    //     i1.addEventListener('click',function(){console.log('Deberia eliminar!')});
        
    // }
    i3.addEventListener('click', gifMax);

    if(window.innerWidth<=800){
    span.addEventListener('click',gifMax)}
}


