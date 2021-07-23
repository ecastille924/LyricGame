class Lyric { 
    constructor(content, songName, albumName, releaseYear, genre, artist_id){
        
        this.content = content;
        this.songName = songName;
        this.albumName = albumName;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.artist_id = artist_id;
    }

    
    renderLyricData(){
        let lyricsContainer = document.getElementById("lyrics-container")
    
        lyricsContainer.innerHTML = 
        `
            <ul>
            <h3>${this.genre}</h3>
            <h4>${this.songName} - ${this.releaseYear}</h4>
            <li>${this.content}</li>
            </ul>
        `    
    }   
}