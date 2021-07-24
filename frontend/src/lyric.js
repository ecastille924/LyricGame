class Lyric { 
    constructor(content, songName, albumName, releaseYear, genre, artist_id){
        
        this.content = content;
        this.songName = songName;
        this.albumName = albumName;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.artist_id = artist_id;
    }

    renderLyricInfo(){
        let lyricInfoContainer = document.getElementById("lyric-info-container")
        lyricInfoContainer.innerHTML =
        `
            <h4>${this.songName} - ${this.releaseYear}</h4>
            <h3>${this.genre}</h3>
        `
    }
    renderLyricContent(){
        let lyricsContainer = document.getElementById("lyrics-container")
        lyricsContainer.innerHTML = 
        `
            <p>${this.content}<p>
        `  
       
    }   
}