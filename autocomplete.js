
var searchBarinput = document.getElementById('searchBar');
var searchBarCont = document.getElementById('search-bar-div');

searchBarinput.addEventListener('input', creaAutoComplete);

function creaAutoComplete() {
    
    // SI EXISTE YA UN DIV QUE CONTENGA AUTOCOMPLETES ANTERIORES LOS BORRA
    (document.getElementById('divCtrPredictivo') != null) ? document.getElementById('divCtrPredictivo').remove() : {};

    //CREA UN DIV QUE CONTENGA LOS AUTOCOMPLETES

    /////////////////////////////////TODO LO QUE HACIA ANTES!!!////////////////////////////////////
    let div = document.createElement('div');
    div.id = 'divCtrPredictivo';
    searchBarCont.appendChild(div);
    //BORRA EL CUADRADO SI ES QUE BORRO TODO

    if (document.getElementById('divCtrPredictivo') != null && searchBarinput.value.length == 0) {
        document.getElementById('divCtrPredictivo').remove();
        btnBusqueda.style.display = 'inline-block';
        lupaOculta.style.display = 'none';
        
    } else {
        btnBusqueda.style.display = 'none';
        lupaOculta.style.display = 'inline-block';
        /////////////////////////////////TODO LO QUE HACIA ANTES!!!////////////////////////////////////
        let keyword = searchBarinput.value;
        
        // HAGO EL LLAMADO A LA API
        Giphy.autoCompleteAsync(keyword, function (infoArray) {
            // CREO LOS 3 LABELS QUE CONTIENE LA INFORMACION QUE BUSQUE          
            for (i = 0; i < 3; i++) {
                if (infoArray[i] != undefined) {
                    let spanCtnLabel = document.createElement('span');
                    div.appendChild(spanCtnLabel);
                    let lupa = document.createElement('i');
                    lupa.classList.add('fas', 'fa-search');
                    spanCtnLabel.appendChild(lupa);
                    let label = document.createElement('label');
                    //LE DOY ID VARIABLE
                    label.id = 'label' + i;
                    label.classList.add('label-predict');
                    //GUARDO EN SESSION STORAGE PARA LUEGO PODER USARLA
                    sessionStorage.setItem("label" + i, infoArray[i].name);
                    let negrita = document.createElement('span');
                    negrita.textContent = `${(keyword.slice(0,1)).toUpperCase()}${(keyword.slice(1,keyword.length)).toLowerCase()}`;
                    negrita.style.fontWeight = 'bold';
                    label.appendChild(negrita);
                    let light = document.createElement('span');
                    light.textContent = infoArray[i].name.slice(keyword.length, infoArray[i].name.length);
                    label.appendChild(light);
                    spanCtnLabel.appendChild(label);
                    //reemplazar con CSS
                    label.style.padding = '0 31px';
                    if (i < 2) {
                        label.style.borderBottom = '1px solid grey';
                    }
                    label.addEventListener('click', creaLaBusquedaAutocomplete);
                    
                }
            };   ///////////////////DESCOMENTAR///////////////////////////
            // PONE EL STRING DEL AUTOCOMPLETE QUE APRETO COMO INPUT EN EL SEARCH Y CORRE LA FUNCIONA PARA BUSCAR
            // LA FUNCION PARA BUSCAR LLAMA A LA API DE BUSQUEDA     
            function creaLaBusquedaAutocomplete() {
                let thisid = new String(this.id);
                console.log(this.id);
                searchBarinput.value = sessionStorage.getItem(thisid);
                creaLaBusqueda();
                searchBarinput.value = ''
            }
            // div.style.border = '1px solid #572ee5';//////////////// DESCOMENTAR!!//////////////
            // if(document.getElementsByClassName('label-predict').length==0){
            //     document.getElementById('divCtrPredictivo').remove();                
            // }
        }
        )
    }
}