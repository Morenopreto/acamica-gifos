
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