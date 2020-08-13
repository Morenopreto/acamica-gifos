

//https://developers.giphy.com/docs/api/endpoint#search



// OBJETO PARA CONECTAR A LAS RESPECTIVAS APIS
class Giphy {
    constructor(keyword) {
        this.keyword = keyword;
        this.endpoint = 'https://api.giphy.com/v1/gifs';
        this.api_key = 'N6lERcubeOTpHg9bGbhUSEoSaJc5lb6y';
        this.limit = 48;
        this.rating = 'G';
        this.searchURL = `${this.endpoint}/search?api_key=${this.api_key}&q=${keyword}&limit=${this.limit}&rating=${this.rating}`;
        this.autoCompletURL = `${this.endpoint}/search/tags?api_key=${this.api_key}&q=${keyword}&rating=${this.rating}`;
        // this.autoCompletURL = this.endpoint + "/search/tags?api_key=" + this.api_key + "&q=" + this.keyword;
        
    }
     
// METHOD PARA LA BUSQUEDA Y CREACION DE 12 GIFS
    busqueda(callback){    
        // fetch(this.endpoint + "/search?api_key=" + this.api_key + "&q=" + this.keyword)
        fetch(this.searchURL)
        .then(response=>{            
            return response.json();
        })
        .then(json=>{
            callback(json.data);
        })
        .catch(err=>{
            console.error(err);
        })
 
    }

    static busquedaAsync(keyword, callback) {
        return new Giphy(keyword).busqueda(callback);
    }


// METHOD PARA CREAR AUTOCOMPLETE
   autoComplete(callback){
       fetch(this.autoCompletURL)
       .then(respuesta=>{
           return respuesta.json()
           
       })
       .then(json=>{
           callback(json.data)
       })
       .catch(err=>{
           console.error(err);
       })
   }
  static autoCompleteAsync(keyword,callback){
      new Giphy(keyword).autoComplete(callback);
  }
}

