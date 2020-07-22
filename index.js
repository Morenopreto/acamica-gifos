var header = document.getElementsByTagName("header");
let main = document.getElementsByTagName("main");
let footer  = document.getElementsByTagName("footer");
let gifSect = document.getElementById("gif-sect");
let mN = document.getElementById("MN");
let anchorTag = document.getElementsByTagName("a");
let h1 = document.getElementsByTagName('h1');
let h2 = document.getElementsByTagName('h2');
let h3 = document.getElementsByTagName('h3');
// let h4 = document.getElementsByTagName('h4');
let p = document.getElementsByTagName('p');


console.log(changeTags);

// ------------HAGO MODO NOCTURNO------------
mN.addEventListener('click', changeMode);
// ---- CREO UN ARRAY CON TODOS LOS ELEMENTOS A MODIFICAR PARA PODER HACER UN SOLO CICLO FOR---
let changeTags =[];
changeTags.push(...h1,...h2,...h3,...p,...anchorTag);

function changeMode(){
    header[0].classList.toggle('bg-dark');    
    main[0].classList.toggle('bg-dark');    
    footer[0].classList.toggle('bg-dark');    

    for(i=0;i<changeTags.length;i++){       
    changeTags[i].classList.toggle('font-dark');
    
    console.log([i]+changeTags[i].classList);    
    }
    

}
