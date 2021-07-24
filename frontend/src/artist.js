class Artist{
    constructor(artistName, id){
        this.artistName = artistName;
        this.id = id;
    }
    renderArtist(){
        let artistContainer = document.getElementById("artist-container")
    
        artistContainer.innerHTML = 
        `
            <h2>${this.artistName}</h2>
        `    
    }   

}