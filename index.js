var header = document.getElementsByTagName("header");
let main = document.getElementById("main");
let footer = document.getElementsByTagName("footer");
let trendSect = document.getElementById("trend-sect");
let mN = document.getElementById("MN");
let AnchormN = document.getElementById("MNA");
let anchorTag = document.getElementsByTagName("a");
// let h1 = document.getElementsByTagName('h1');
// let h2 = document.getElementsByTagName('h2');
// let h3 = document.getElementsByTagName('h3');
// // let h4 = document.getElementsByTagName('h4');
// let p = document.getElementsByTagName('p');



// ------------HAGO MODO NOCTURNO------------
mN.addEventListener('click', changeMode);
// ---- CREO UN ARRAY CON TODOS LOS ELEMENTOS A MODIFICAR PARA PODER HACER UN SOLO CICLO FOR---
let changeTags = [];


function changeMode() {
    header[0].classList.toggle('bg-dark');
    main.classList.toggle('bg-dark');
    footer[0].classList.toggle('bg-dark');

    for (i = 0; i < changeTags.length; i++) {
        changeTags[i].classList.toggle('font-dark');
           
    }
    setTimeout(function(){if (Array.from(header[0].classList).indexOf('bg-dark') != -1) {
        AnchormN.textContent ='MODO DIURNO';
        
    } else { AnchormN.textContent = 'MODO NOCTURNO';}},100)
}

// ---------- CREO OBJETOS PARA CREAR EL CARROUSEL -------


class liCarrousels {
    constructor(liN, url, titulo, user, heart, download, expand, show) {
        this._liN = liN;
        this._url = url;
        this._titulo = titulo;
        this._user = user;
        this._expand = expand;
        this._download = download;
        this._heart = heart;
        this._show = show;
    }
}
let ulCarrousel = document.getElementById('ul-carrousel');
let li1 = new liCarrousels(document.getElementById('li1'), "url'(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhKwjXzadLTpAToxpatiZxy6pLbAsVRJb8ASbgOEAcE5Y9EI&s'", "Nueva imagen", "", "", "", "", true);
let li2 = new liCarrousels(document.getElementById('li2'), "url'(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhKwjXzadLTpAToxpatiZxy6pLbAsVRJb8ASbgOEAcE5Y9EI&s'", "Nueva imagen", "", "", "", "", true);
let li3 = new liCarrousels(document.getElementById('li3'), "url'(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhKwjXzadLTpAToxpatiZxy6pLbAsVRJb8ASbgOEAcE5Y9EI&s'", "Nueva imagen", "", "", "", "", true);
let li4 = new liCarrousels(document.getElementById('li4'), "url'(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhKwjXzadLTpAToxpatiZxy6pLbAsVRJb8ASbgOEAcE5Y9EI&s'", "Nueva imagen", "", "", "", "", false);
let li5 = new liCarrousels(document.getElementById('li5'), "url'(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhKwjXzadLTpAToxpatiZxy6pLbAsVRJb8ASbgOEAcE5Y9EI&s'", "Nueva imagen", "", "", "", "", false);
let liArray = [li1, li2, li3, li4, li5];
let flechasIzqDer = document.getElementsByClassName('square-i');

flechasIzqDer[0].addEventListener('click', moverCarrouselIzq);
flechasIzqDer[1].addEventListener('click', moverCarrouselDer);

function moverCarrouselIzq() {
    for (i = 0; i < liArray.length; i++) {

        if (liArray[i]._liN.classList[1] == "primer-li") {
            liArray[i]._liN.classList.add('oculto2');
            liArray[i]._liN.classList.remove('primer-li');

        } else if (liArray[i]._liN.classList[1] == "segundo-li") {
            liArray[i]._liN.classList.add('primer-li');
            liArray[i]._liN.classList.remove('segundo-li');
            // console.log(liArray[i]._liN);
        } else if (liArray[i]._liN.classList[1] == "tercer-li") {
            liArray[i]._liN.classList.add('segundo-li');
            liArray[i]._liN.classList.remove('tercer-li');
            // console.log(liArray[i]._liN);
        } else if (liArray[i]._liN.classList[1] == "oculto1") {
            liArray[i]._liN.classList.add('tercer-li');
            liArray[i]._liN.classList.remove('oculto1');
            // console.log(liArray[i]._liN);
        } else if (liArray[i]._liN.classList[1] == "oculto2") {
            liArray[i]._liN.classList.add('oculto1');
            liArray[i]._liN.classList.remove('oculto2');
            // console.log(liArray[i]._liN);
        } else { console.log("no anda") }
        // }
    }
}
function moverCarrouselDer() {
    for (i = 0; i < liArray.length; i++) {

        if (liArray[i]._liN.classList[1] == "primer-li") {
            liArray[i]._liN.classList.add('segundo-li');
            liArray[i]._liN.classList.remove('primer-li');

        } else if (liArray[i]._liN.classList[1] == "segundo-li") {
            liArray[i]._liN.classList.add('tercer-li');
            liArray[i]._liN.classList.remove('segundo-li');
            // console.log(liArray[i]._liN);
        } else if (liArray[i]._liN.classList[1] == "tercer-li") {
            liArray[i]._liN.classList.add('oculto1');
            liArray[i]._liN.classList.remove('tercer-li');
            // console.log(liArray[i]._liN);
        } else if (liArray[i]._liN.classList[1] == "oculto1") {
            liArray[i]._liN.classList.add('oculto2');
            liArray[i]._liN.classList.remove('oculto1');
            // console.log(liArray[i]._liN);
        } else if (liArray[i]._liN.classList[1] == "oculto2") {
            liArray[i]._liN.classList.add('primer-li');
            liArray[i]._liN.classList.remove('oculto2');
            // console.log(liArray[i]._liN);
        } else { console.log("no anda") }
        // }
    }
}

