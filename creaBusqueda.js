// BUSQUEDA DE GIF CON LA BARRA SEARCH Y LOS MUESTRA 4X3.
var btnBusqueda = document.getElementById('searchBtn');
var lupaOculta = document.getElementById('lupaOculta');
let busquedaAsyncResult;
let guardaArray;// creo que se puede borrar


lupaOculta.addEventListener('click', creaLaBusqueda);


// SIRVE PARA, TENIENDO KEYWORDS EN EL INPUT DE BUSQUEDA, GENERAR ESA BUSQUEDA CON LA API.
function creaLaBusqueda() {
    cuantosVerMas = 0;
    if (document.getElementById('divCtrPredictivo') != null) {
        document.getElementById('divCtrPredictivo').remove();
    }
    keyword = searchBarinput.value;
    // console.log('keyword: '+ keyword);
    // console.log(searchBarinput);
    let sectContenedor = document.createElement('section');
    sectContenedor.id = 'sectGifsBusqueda';
    sectContenedor.classList.add('sectContGifs');
    document.getElementById('main').insertBefore(sectContenedor, document.getElementById('trend-sect'));

    Giphy.busquedaAsync(keyword, function (arrayResults) {

        // download="ImageNameHere"
        console.log(arrayResults);
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
           if(screen.width>=800){
            if (arrayResults.length <= 4) {
                div.style.gridTemplateRows = '200px'
            }
            else if (arrayResults.length <= 8) {
                div.style.gridTemplateRows = 'repeat(2, 200px)'
            } else { div.style.gridTemplateRows = 'repeat(3, 200px)' }}
            //FIN DE LIMTANTE
            // CREO UNA VARIABLE PARA MOSTRAR COMO MAXIMO 12 Y COMO MINIMO, LA CANTIDAD QUE TRAIGA
            //EL ARRAY
            let frenoCreacion = Math.min(arrayResults.length, 12);

            for (i = 0; i < frenoCreacion; i++) {
                creaLosGifs(arrayResults[i], 'div-cont-gifs-search');
            }
            let verMas = document.createElement('button');
            verMas.textContent = 'Ver Mas';
            verMas.id = 'verMas';
            sectGifsBusqueda.appendChild(verMas);

            // CHEQUEAR FUNCION VER MAS
            verMas.addEventListener('click', verMasFunc);
        } else {
            let img = document.createElement('img');
            img.src = 'assets/icon-busqueda-sin-resultado.svg'
            sectContenedor.appendChild(img);
            let h2 = document.createElement('h2');
            h2.textContent = 'Intenta con otra búsqueda.';
            h2.style.width = '100%';
            h2.style.color = '#50E3C2';
            h2.style.textAlign = 'center';
            sectContenedor.appendChild(h2);

        }

    }
    )
}

// EXISTE UN CONTENDOR Y CON LA FUNCION CREO LA ESTRUCTURA DEL CONTENIDO DE ADENTRO
function creaLosGifs(srcParam, divDonde) {
    let div = document.getElementById(divDonde)
    let source = srcParam.images.original.mp4
    let span = document.createElement('span');
    span.id ='span-cnt-'+i;
    div.appendChild(span);
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
    i1.classList.add('far', 'fa-heart');
    i2.classList.add('fas', 'fa-heart');
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
    if (document.getElementById('search-sect') != null) {
        i1.addEventListener('click', agregaFav);
        i3.addEventListener('click', gifMax);
    }
    console.log(screen.width);
    if(screen.width<=800){
        
    // span.addEventListener('click',gifMax)
    span.addEventListener('click',gifMax)}
}
// Un botón de ‘Ver más’: la acción es mostrar 12 resultados más cada vez que se apriete (es decir, que a medida que el usuario elija esta opción una y otra vez, deberán mostrarse en total 24, 36, 48 —y así sucesivamente— resultados por pantalla). El botón siempre debe quedar expuesto y desaparecer cuando no hay más resultados para mostrar.


