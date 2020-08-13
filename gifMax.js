
var indice;

function gifMax() {
    
    if(screen.width>800){ indice = parseFloat(this.id.substr(11, this.id.length))};
    if(screen.width<=800){ indice = parseFloat(this.id.substr(9, this.id.length))};
   
    let main = document.getElementById('main');
    let sectMax = document.createElement('section');//creamos seccion contenedora
    sectMax.id = 'max-section';
    let data = document.getElementsByClassName('span-gifs-hover'); //TRAIGO LOS SPANS ANTERIORES PARA OBTENER EL VIDEO
    let video = data[indice].firstChild.cloneNode(true); //video
    let x = document.createElement('i');
    x.classList.add('fa-times');
    x.classList.add('fas');
    let divP = document.getElementsByClassName('i-p-div')[indice]// user y gif name
    divP.id = 'div-ctn-user-gifName';
    let divI = document.getElementsByClassName('i-div')[indice] // download, heart y expand
    let ctnX = document.createElement('div');
    let ctnVideo = document.createElement('div'); // creo contenedor para poder manipular el video mas facil
    let spanVideo = document.createElement('span'); // creo contenedor para poder manipular el video mas facil
    let ctnIp = document.createElement('div'); // creo contenedor para agrupar los simbolos y los p
    let left = document.createElement('i');
    let right = document.createElement('i');
    main.appendChild(sectMax);
    sectMax.appendChild(ctnX);
    sectMax.appendChild(ctnVideo);
    sectMax.appendChild(ctnIp);
    ctnX.appendChild(x);
    ctnVideo.appendChild(left);
    ctnVideo.appendChild(spanVideo);
    ctnVideo.appendChild(right);
    spanVideo.appendChild(video);
    ctnIp.appendChild(divP);
    ctnIp.appendChild(divI);
    ctnVideo.id = 'ctnVideo';
    video.id = 'videoMax';
    ctnX.id = 'ctnX';
    ctnIp.id = 'ctnip';
    divI.classList.add('i-div');
    divP.classList.add('i-p-div');
    left.classList.add('fas');
    left.classList.add('fa-chevron-left');
    right.classList.add('fas');
    right.classList.add('fa-chevron-right');
    left.id = 'leftChevron';
    right.id = 'rightChevron';

    x.addEventListener('click',cierraMax);
    sectMax.addEventListener('scroll', disableScroll());// DESHABLITO LA OPCION DE SCROLL
    left.addEventListener('click',carrouselMaxIzq);
    right.addEventListener('click',carrouselMaxDer);
 
 if(indice==0){        
    left.style.display = 'hidden';
 }else if(indice==busquedaAsyncResult.length-1){
    right.style.display = 'hidden';
 }
}
function disableScroll() {
    var x = 0;
    var y = 0;
    window.scrollTo(x, y);
    window.onscroll = function () { window.scrollTo(x, y) };
}

function cierraMax(){
document.getElementById('max-section').remove();
window.onscroll = false;
}


function carrouselMaxIzq(){
    console.log(indice);    
    let video = document.getElementById('videoMax');
    let der = document.getElementById('rightChevron');
    let izq = document.getElementById('leftChevron');
    if(indice==1){        
        document.getElementById('leftChevron').style.visibility = 'hidden';
      
     } else if(indice==busquedaAsyncResult.length-1){
      document.getElementById('rightChevron').style.visibility = 'visible';
     
     }
        indice -= 1;
    let user = document.getElementById('div-ctn-user-gifName').firstChild;
    let gifName = document.getElementById('div-ctn-user-gifName').lastChild;
    video.src = busquedaAsyncResult[indice].images.original.mp4;
    user.textContent = busquedaAsyncResult[indice].username;
    gifName.textContent = busquedaAsyncResult[indice].title;
    

    //VER COMO HACER PARA FAVORITO Y DESCARGA FUNCIONEN EN ESTE Y NO EN QUE ABRI
}
function carrouselMaxDer(){
    console.log(indice);

    let video = document.getElementById('videoMax');
    let izq = document.getElementById('leftChevron');
    let der = document.getElementById('rightChevron');
   
    if(indice==0){  
        document.getElementById('leftChevron').style.visibility = 'visible'   
     }else if(indice==busquedaAsyncResult.length-2){
      document.getElementById('rightChevron').style.visibility = 'hidden';
     }
   
      indice += 1;
    let user = document.getElementById('div-ctn-user-gifName').firstChild;
    let gifName = document.getElementById('div-ctn-user-gifName').lastChild;
    video.src = busquedaAsyncResult[indice].images.original.mp4;
    user.textContent = busquedaAsyncResult[indice].username;
    gifName.textContent = busquedaAsyncResult[indice].title;   

    //VER COMO HACER PARA FAVORITO Y DESCARGA FUNCIONEN EN ESTE Y NO EN QUE ABRI
}