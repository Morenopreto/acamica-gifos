//EN ESTE ARCHIVO PODREMOS ENCONTRAR:
//- FUNCION PARA LA APARICION DE LA BARRA DE BUSQUEDA EN EL HEADER
// LA APARICION SE RERALIZA AL MOMENTO EN EL QUE EL HEADER SUPERA LA BARRA DE BUSQUEDA ORIGINAL
//LA BARRA DE BUSQUEDA EN EL HEADER CUENTA CON FUNCIONALIDAD DE BUSQUEDA PERO NO DE RECOMENDACIONES

let searchBar = document.getElementById('search-bar-div');
let navBar = document.getElementById('navBar');
let ulnavBar = document.getElementById('ulnavBar');
// let data = searchBar.cloneNode(true); //video
// navBar.insertBefore(data,ulnavBar);
function apareceBarra(){
    if (screen.width > 800 && document.getElementById('search-sect') != null){ 
        header.style.position ='fixed';
        // main.style.margin = '100px 0 0 0';
    if(window.innerWidth > 980 && window.scrollY>document.getElementById('search-bar-div').offsetTop&& document.getElementById('head-search-bar-div')==null ){
        limpiaSearch();
        console.log(window.scrollY)
        let searchBarAnterior = searchBar.cloneNode(true); //video
        searchBarAnterior.id ='head-search-bar-div';
        searchBarAnterior.firstChild.childNodes[1].id = 'searchBarHeader';
        searchBarAnterior.firstChild.childNodes[2].id = 'searchBtnHeader';
        navBar.insertBefore(searchBarAnterior,ulnavBar);
        
        // data.firstChild.childNodes[1].addEventListener('input',function(){
        //     searchBarinput.value =data.firstChild.childNodes[1].value ;
        // })

        // data.firstChild.childNodes[3]('click', creaLaBusqueda);
        searchBarAnterior.firstChild.childNodes[2].addEventListener('click', creaLaBusqueda);
       

}else if(window.scrollY<document.getElementById('search-bar-div').offsetTop&& document.getElementById('head-search-bar-div')!=null){
    document.getElementById('head-search-bar-div').remove();

}
if(document.getElementById('head-search-bar-div')!=null&&window.innerWidth < 980){
    document.getElementById('head-search-bar-div').remove();
   
}

}



};

window.onscroll = ()=>(apareceBarra());

// addEventListener('click', creaLaBusqueda)

