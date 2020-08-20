//EN ESTE ARCHIVO PODREMOS ENCONTRAR:
//- FUNCIONES QUE DAN FUNCIONALIDAD A LOS BOTONES VER MAS DE CADA SECCION SEGUN CORRESPONDA.
var cuantosVerMas = 0;


function verMasFunc(){    
    
    cuantosVerMas +=12;
    let frenoCreacion = Math.min(busquedaAsyncResult.length,cuantosVerMas+12);
    
    for (i = cuantosVerMas; i < frenoCreacion; i++) {
        creaLosGifs(busquedaAsyncResult[i], 'div-cont-gifs-search');
    }
    
   if(busquedaAsyncResult.length==frenoCreacion){
       this.remove();
   }
    
}

function verMasFuncFav(){    
    
    cuantosVerMas +=12;
    let frenoCreacion = Math.min(JSON.parse(favArray).length,cuantosVerMas+12);
    
    for (i = cuantosVerMas; i < frenoCreacion; i++) {
        creaLosGifs(JSON.parse(favArray)[i], 'div-cont-gifs-fav');
    }
    
   if(JSON.parse(favArray).length==frenoCreacion){
       this.remove();
   }
    
}
function verMasFuncMis(){    
    
    cuantosVerMas +=12;
    let frenoCreacion = Math.min(misGifosArray.length,cuantosVerMas+12);
    
    for (i = cuantosVerMas; i < frenoCreacion; i++) {
        creaLosGifs(arrayResultsvar[i], "div-cont-gifs-fav");
    }
    
   if(misGifosArray.length==frenoCreacion){
       this.remove();
   }
    
}