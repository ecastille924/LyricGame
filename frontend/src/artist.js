class Artist{
    constructor(artistName, id){
        this.artistName = artistName;
        this.id = id;
    }
    renderArtist(){
        let artistContainer = document.getElementById("artist-container")
    
        artistContainer.innerHTML = 
        `
            <ul>
            <h3>${this.artistName}</h3>
            </ul>
        `    
    }   

}