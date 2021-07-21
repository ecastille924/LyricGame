document.addEventListener("DOMContentLoaded", () => {
    fetchLyrics();
})

const baseUrl = "http://localhost:3000"
   
//read - show an individual, random lyric

    function fetchLyrics(){
        fetch(`${baseUrl}/lyrics`)
        .then(resp => resp.json())
        .then(lyrics => {
            for (const lyric of lyrics){
                let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
                console.log(l)
            }
        }
            )
    }

    //read- show all lyrics (and associated artist)

    // create - create new lyric (with artist association)

    // delete - delete a lyric
