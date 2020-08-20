// EN ESTE ARCHIVO PODEMOS ENCONTRAR:
//- FUNCION QUE CREA HOME PAGE O SECCION DE BUSQUEDA CON SUS RESPECTIVAS IMAGENES, BARRA DE BUSQUEDA, ETC.

//CREO LA SECCION HOMEPAGE
let logoImg = document.getElementById('logo');



logoImg.addEventListener('click', creaHP);

creaHP();


function creaHP() {
    
    let primerasSect = document.getElementsByTagName('section');
    if (primerasSect[0].id != 'search-sect' && primerasSect[0].id != 'trend-sect') {
        primerasSect[0].remove();
        trendSect.style.display = 'flex';
        //   if(document.getElementById('sectGifsBusqueda')!=null){document.getElementById('sectGifsBusqueda').remove();}      
    };
    if (document.getElementById('sectGifsBusqueda') != null) { document.getElementById('sectGifsBusqueda').remove(); }

    if (primerasSect[0].id != 'search-sect') {
        //CREO LA SECCION, LE DOY ID Y LA ACOMODO ARRIBA DE LOS TREND
        window.scrollTo(0,0);
        var searchSect = document.createElement('section');
        searchSect.id = 'search-sect';
        main.insertBefore(searchSect, trendSect);
        // CREO EL H1 CON SUS SPANS, LA AGREGO LOS CLASS PARA ITERAR ENTRE NIGHT/LIGTH
        // LA AGREGO A LA SECCION QUE CREE ANTES
        let newH1 = document.createElement('h1');
        newH1.classList.add('font-light');
        // changeTags.push(newH1);
        searchSect.appendChild(newH1);
        let fSpanH1 = document.createElement('span');
        let sSpanH1 = document.createElement('span');
        let tSpanH1 = document.createElement('span');
        fSpanH1.id = 'firstpart-h1';
        tSpanH1.id = 'green-text';
        fSpanH1.textContent = 'Inspírate, busca, guarda, y crea';
        sSpanH1.textContent = ' los mejores ' + "  ";
        tSpanH1.textContent = '  GIFOS';
        newH1.appendChild(fSpanH1);
        newH1.appendChild(sSpanH1);
        newH1.appendChild(tSpanH1);
        //CREO LA IMAGEN DE LAS PERSONAS, LE DOY SU SRC Y DEMAS, LA AGREGO AL SECTION
        let peopleImg = document.createElement('img');
        peopleImg.src = 'assets/ilustra_header.svg';
        peopleImg.alt = 'people-draw';
        peopleImg.id = 'people-draw';
        searchSect.appendChild(peopleImg);
        // CREO EL CONTENEDOR PARA EL BOTON DE BUSQUEDA, LE DOY ID, CLASS Y LO AGREGO AL SECTION
        let searchDiv = document.createElement('div');
        searchDiv.classList.add('search-bar');
        searchDiv.id = 'search-bar-div';
        searchSect.appendChild(searchDiv);
        // CREO UN SPAN PARA PODER TENER JUNTO EL INPUT SEARCH Y LA LUPA
        let spanCtn = document.createElement('span');
        searchDiv.appendChild(spanCtn);
        // CREO UNA LUPA QUE VA A ESTAR OCULTA
        let lupa2 = document.createElement('i');
        lupa2.id = 'lupaOculta';
        lupa2.classList.add('fas', 'fa-search');
        spanCtn.appendChild(lupa2);
        lupa2.style.display = 'none';
        // CREO EL INPUT Y LA LUPA
        let searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'searchBar';
        searchInput.placeholder = 'Busca GIFOS y más.';
        spanCtn.appendChild(searchInput);
        let searchButton = document.createElement('button');
        searchButton.type = 'submit';
        searchButton.id = 'searchBtn';
        spanCtn.appendChild(searchButton);
        let lupa = document.createElement('i');
        lupa.classList.add('fas', 'fa-search');
        searchButton.appendChild(lupa);
        //CREO LA CRUZ EN LA QUE SE VA A TRASNFORMAR LA LUPA CUANDO BUSCO
        let searchX = document.createElement('i');
        searchX.classList.add('fas', 'fa-times');
        searchX.style.display = 'none';
        searchX.id = 'searchX';
        spanCtn.appendChild(searchX);

        // CREO EL TEXTO DEBAJO
        let h3Div = document.createElement('div');
        h3Div.id = 'h3-p';
        searchSect.appendChild(h3Div);

        let h3 = document.createElement('h3');

        h3.textContent = 'Trending:';
        h3.classList.add('font-light');
        h3Div.appendChild(h3);
        let p = document.createElement('p');
        p.classList.add('font-light');
        p.textContent = 'Reactions, Entertainment, Sports, Stickers, Artists';
        h3Div.appendChild(p);
        // changeTags = []
        // changeTags.push(...anchorTag);
        // changeTags.push(fSpanH1);
        // changeTags.push(sSpanH1);
        // changeTags.push(h3);
        // changeTags.push(p);
        // changeTags.push(searchInput);
        // changeTags.push(lupa);
        if (document.getElementById('searchBar') != null && document.getElementById('search-bar-div') != null) {

            searchBarinput = document.getElementById('searchBar');
            searchBarCont = document.getElementById('search-bar-div');
            (typeof (creaLaBusqueda) == 'function') ? lupaOculta.addEventListener('click', creaLaBusqueda) : {};
            (typeof (creaAutoComplete) == 'function') ? searchBarinput.addEventListener('input', creaAutoComplete) : {};
        }

        let indiceColor = Array.from(document.getElementById('MNA').classList).indexOf('font-dark')
        if(indiceColor != -1){
            cambiaColor(0,1);
            document.getElementById('search-bar-div').classList.toggle('border-ligth');
            //CAMBIO EL COLOR DE LA LUPA (POR LA PROFUNDIDAD EN LA QUE ESTA DEFINIDA, NO LA AGARRA NINGUN FOR)
       document.getElementById('searchBtn').firstChild.classList.toggle('font-dark')
       document.getElementById('searchBar').classList.toggle('font-dark');
        }
    }
    if(screen.width>800){
        for(i=0;i<3;i++){
        document.getElementsByTagName("a")[i].classList.add('font-light')}
    }
}


