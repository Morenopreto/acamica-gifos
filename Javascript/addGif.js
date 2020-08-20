
//EN ESTE ARCHIVO VAMOS A ENCONTRAR:
//-CREACION DE SECCION PARA GRABACION DE GIFOS
//-PETICION DE AUTORIZACION A CAMARA WEB
//-PASOS PARA GRABACION DE GIFOS
//CONEXION A API DE SUBIDA PARA CARGAR EN GIPHY EL GIF PREVIAMENTE GRABADO

let addGifSectButton = document.getElementById('add-gif');
addGifSectButton.addEventListener('click', abreAddGif);



var misGifosArray = JSON.parse(localStorage.getItem('idsSubidos')); //FAVORITOS DE CARGAS DE PAGINA ANTERIORES

var idSubidos = [];// ARRAY DONDE CONTIENE LOS FAVORITOS 

// ESTA FUNCION AGREGA AL ARRAY DE FAV ACTUALES, LOS DE SESIONES ANTERIORES
function mantieneIdsGuardadosAnteriores(){
    if (misGifosArray != null) {
        for (i = 0; i < misGifosArray.length; i++) {
            idSubidos.push(misGifosArray[i]);
        }
    }
}
mantieneIdsGuardadosAnteriores(); 

function abreAddGif() {
    if (document.getElementById('addGifSect') == null) {
        window.scrollTo(0,0);


        // favArray = localStorage.getItem('favoritos');
        //SI EXISTIO UNA BUSQUEDA LA BORRA
        (document.getElementById('sectGifsBusqueda') != null) ? document.getElementById('sectGifsBusqueda').remove() : {};
        //SI LA SECCION CON SEARCH BAR ESTA EN PANTALLA, LA ELIMINA
        (document.getElementById('search-sect') != null) ? document.getElementById('search-sect').remove() : {};
        //SI LA SECCION FAVORITOS ESTA EN PANTALLA, LA ELIMINA
        (document.getElementById('favSect') != null) ? document.getElementById('favSect').remove() : {};
        //SI LA SECCION MIS GIFOS ESTA EN PANTALLA, LA ELIMINA        
        (document.getElementById('misGifosSect') != null) ? document.getElementById('misGifosSect').remove() : {};
        // OCULTA LA SECCION DE TRENDING
        trendSect.style.display = 'none';
        //SI EXISTE LA SEARCH BAR EN EL HEADER, LA BORRA
        (document.getElementById('head-search-bar-div') != null) ? document.getElementById('head-search-bar-div').remove() : {};

        //     let searchSectRemove = document.getElementById('search-sect');
        //    searchSectRemove.remove();
        let addGifSect = document.createElement('section');
        addGifSect.id = "addGifSect";
        main.insertBefore(addGifSect, trendSect);
        // DIV PARA CAMARA Y  LUZ CAMARA
        let divCamara = document.createElement('div');
        divCamara.id = 'divCamara';
        addGifSect.appendChild(divCamara);
        let camaraImg = document.createElement('img');
        camaraImg.src = 'assets/camara.svg'
        divCamara.appendChild(camaraImg);
        let camaraLuz = document.createElement('img');
        camaraLuz.src = 'assets/element-luz-camara.svg'
        divCamara.appendChild(camaraLuz);
        //DIV PARA EL CUADRADO DE CAMARA, CON CANVAS Y TODO

        let divCanvas = document.createElement('div');
        divCanvas.id = 'divCanvas';
        addGifSect.appendChild(divCanvas);
        let podrasCtn = document.createElement('div');
        podrasCtn.id = 'podrasDiv';
        divCanvas.appendChild(podrasCtn);
        let podras = document.createElement('p');
        podras.id = 'podras';
        let gifosSpan = document.createElement('span');
        podras.textContent = 'Aqui podras crear tus propios';
        gifosSpan.textContent = 'GIFOS';
        podrasCtn.appendChild(podras);
        podras.appendChild(gifosSpan);
        let crea3pasos = document.createElement('p');
        crea3pasos.textContent = 'Crea tu GIFO en solo 3 pasos!';
        let soloNecesitas = document.createElement('p');
        soloNecesitas.textContent = '(solo necesitas una camara para grabar un video)';
        podrasCtn.appendChild(crea3pasos);
        podrasCtn.appendChild(soloNecesitas);
        // CREO 4 CUADRADOS PARA DARLE LOS BORDES VERDES
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        let span4 = document.createElement('span')
        span1.id = 'sq-verde-1'
        span2.id = 'sq-verde-2'
        span3.id = 'sq-verde-3'
        span4.id = 'sq-verde-4'
        span1.classList.add('sq-deco-verde')
        span2.classList.add('sq-deco-verde')
        span3.classList.add('sq-deco-verde')
        span4.classList.add('sq-deco-verde')
        divCanvas.appendChild(span1)
        divCanvas.appendChild(span2)
        divCanvas.appendChild(span3)
        divCanvas.appendChild(span4)
        //////////NUMERO  1
        //////////NUMERO 2
        /////////NUMERO 3
        let video = document.createElement('video');
        video.id = 'addGifVideo';
        divCanvas.appendChild(video);
        //ver que carajo tendria que ir aca adentro///////////////////////////
        let numbersButtonDiv = document.createElement('div');
        numbersButtonDiv.id = 'numbersButtonDiv';
        addGifSect.appendChild(numbersButtonDiv);
        // creo un span para los tres numeros
        let spanNumbers = document.createElement('span');
        numbersButtonDiv.appendChild(spanNumbers);
        let uno = document.createElement('label');
        let dos = document.createElement('label');
        let tres = document.createElement('label');
        uno.textContent = '1';
        uno.id = 'uno';
        dos.id = 'dos';
        tres.id = 'tres';
        dos.textContent = '2';
        tres.textContent = '3';
        spanNumbers.appendChild(uno);
        spanNumbers.appendChild(dos);
        spanNumbers.appendChild(tres);
        // creo span para el tiempo de grabacion
        let linea = document.createElement('span')
        numbersButtonDiv.appendChild(linea);
        linea.id = 'lineaVioleta';
        //creo boton
        let boton = document.createElement('button');
        boton.textContent = 'COMENZAR';
        boton.id = 'botonFilm';
        numbersButtonDiv.appendChild(boton);
        boton.addEventListener('click', pideAutorizacion);

        /////ver que ponerle aca adentro
        let cintaDiv = document.createElement('div');
        cintaDiv.id = 'cintaDiv';
        addGifSect.appendChild(cintaDiv);
        let cintaImg = document.createElement('img');
        cintaImg.src = 'assets/pelicula.svg'
        cintaDiv.appendChild(cintaImg);
    }     
    if(document.getElementById('MNA').textContent != 'Modo Nocturno'){
        cambiaColor(0,1);
    }
}


//CREA LA PROMESA PARA PEDIR AUTORIZACION DE CAMARA
function pideAutorizacion() {
    let video = document.getElementById('addGifVideo');
    let podrasDiv = document.getElementById('podrasDiv');

    podrasDiv.style.display = 'none';
    autoriza();
    uno.style.backgroundColor = '#572ee5';
    uno.style.color = '#ffffff';
    let stream = null;

    stream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
        
    })
        // aca deberia correr autorizacion
        .then(function (stream) {
            pasoDos(video);
            console.log(stream);
            video.srcObject = stream;
            video.play()
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });

        })

        .catch(err => {
            console.error(err);
            console.error('El dispositivo de grabacion no se encuetra disponible');
            mensajeErr();

        })

}
// MUESTRA EN PANTALLA CARTELES DE AUTORIZACION, EN CASO DE NO AUTORIZAR, EL CATCH DE LA PROMESA
//ANTERIOR TIENE LA RESOLUCION AL PROBLEMA.
function autoriza() {
    let divCtn = document.getElementById('divCanvas');
    let div = document.createElement('div');
    div.id = 'divAutoriza';
    let accesoP = document.createElement('p');
    accesoP.id = 'accesoP';
    let p = document.createElement('p');
    p.id = 'pAcceso';
    accesoP.textContent = 'Nos das acceso a tu camara?'
    p.textContent = 'El acceso a tu camara sera valido solo por el tiempo en el que estes creando el gifo';
    divCtn.appendChild(div);
    div.appendChild(accesoP);
    div.appendChild(p);
    let button = document.getElementById('botonFilm');
    button.style.display = 'none';
    button.removeEventListener('click', pideAutorizacion);

}


// UNA VEZ AUTORIZADO MUESTRA EN PANTALLA LA IMAGEN DE LA CAMARA Y MUESTRA BOTON GRABAR
function pasoDos(video) {
    document.getElementById('divAutoriza').remove();
    video.style.display = 'inline-block';
    uno.style.backgroundColor = 'transparent';
    uno.style.color = '#572ee5';
    dos.style.backgroundColor = '#572ee5';
    dos.style.color = '#ffffff';
    let button = document.getElementById('botonFilm');
    button.textContent = 'GRABAR';
    button.style.display = 'inline-block';
    button.addEventListener('click', grabar);


}
// AL APRETAR EL BOTON GRABAR COMIENZA LA GRABACION.
function grabar() {
    recorder.startRecording();
    let button = document.getElementById('botonFilm');
    button.textContent = 'FINALIZAR';
    button.removeEventListener('click', grabar);
    button.addEventListener('click', ejecuta);

}
//FUNCION DE APOYO
function ejecuta() {
    finalizarGrabacion(cuandoFinaliza);
}
// UNA VEZ QUE FINALIZA LA GRABACION  SE LLAMA AL METHOD STOPRECORDING PASANDOLE CUANDOFINALIZA COMO PARAMETRO
function finalizarGrabacion(callback) {
    recorder.stopRecording(callback);
}
// ES EL PARAMETRO DE LA FUNCION ANTERIOR,
//UNA VEZ FINALIZADO LA GRABACION CREA UN FORMDATA CON LA INFORMACION DEL VIDEO GRABADO
// REALIZA LA PETICION POST PARA SUBIR A GIPHY LA INFORMACION ALMACENADA EN EL FORM DATA
function cuandoFinaliza() {
    let video = document.getElementById('addGifVideo');
    let videoDiv = document.getElementById('divCanvas');

    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    //////////////////////////
    let info = URL.createObjectURL(recorder.getBlob());
    // let urlSubir = info.slice(5,info.length);
    sessionStorage.setItem('gifosURL', info);
    // console.log(form.get('file'));
    // console.log(form.get('file'))

    //INICIO DE FRENO A  LA CAMARA
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
    });
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = info;
    recorder = null;
    ///MUESTRO EL GIF GRABADO
    let img = document.createElement('img');

    video.style.display = 'none';
    videoDiv.appendChild(img);
    img.src = info;
    img.id = 'imgGif';

    // localStorage.setItem('formData',formString);
    let button = document.getElementById('botonFilm');
    button.textContent = 'SUBIR GIFO';
    button.removeEventListener('click', ejecuta);
    button.addEventListener('click', subirGifo);


    /// SUBIR GIFO
    function subirGifo() {
        dos.style.backgroundColor = 'transparent';
        dos.style.color = '#572ee5';
        tres.style.backgroundColor = '#572ee5';
        tres.style.color = '#ffffff';
        let button = document.getElementById('botonFilm');
        button.style.display = 'none';
        console.warn('subirGifos');
        let cargaImg = document.createElement('img');
        cargaImg.src = 'assets/loader.svg';
        cargaImg.id = 'loader';
        let pEspera = document.createElement('p');
        pEspera.id = 'pLoader';
        pEspera.textContent = 'Estamos subiendo tu GIFO';
        videoDiv.appendChild(cargaImg);
        videoDiv.appendChild(pEspera);
        let mascaraVioleta = document.createElement('div');
        mascaraVioleta.id = 'divVioleta';
        videoDiv.appendChild(mascaraVioleta);
        fetch(`https://upload.giphy.com/v1/gifs?api_key=N6lERcubeOTpHg9bGbhUSEoSaJc5lb6y`
            , {
                method: 'POST',
                body: form,
            }
        )
            .then(respuestaUpload => {
                return respuestaUpload.json()

            })
            .then(jsonUpload => {
                console.warn('SUBIDO!');
                console.warn(`EL ID FUE:${jsonUpload.data.id}`);
                // console.log(jsonUpload);
                // console.log(jsonUpload.data);
                // console.log(jsonUpload.data.id);//ESTA ES LA DATA QUE NECESITO GUARDAR EN LOCALSTORAGE
                idSubidos.push(jsonUpload.data.id);
                localStorage.setItem('idsSubidos',JSON.stringify(idSubidos));
                pEspera.textContent = 'GIFO subido con exito';
                cargaImg.src = 'assets/check.svg';
                cargaImg.id = 'tickSubido';
               
            })
            .catch(err => {
                console.error(err);
            })
    }

}

// EN CASO DE ERROR POR NO AUTORIZACION DE CAMARA O QUE LA CAMARA NO SE ENCUENTRE DISPONIBLE
//ES EJECUTADA EN EL CATHC DE LA PROMESA DE PETICION DE AUTORIZACION DE CAMARA
function mensajeErr(){
    document.getElementById('accesoP').textContent = 'Camara no disponible';
    document.getElementById('pAcceso').textContent =   'No cuenta con un dispositivo de grabacion o no se encuentra disponible en este momento.';
    document.getElementById('numbersButtonDiv').firstChild.style.visibility = 'hidden';
}