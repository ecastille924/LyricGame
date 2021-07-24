document.addEventListener("DOMContentLoaded", () => {
    fetchLyrics();
    // fetchArtist();
})

const baseUrl = "http://localhost:3000"
 

function fetchLyrics(){
    fetch(`${baseUrl}/lyrics`)
    .then(resp => resp.json())
    .then(lyrics => {
        for (const lyric of lyrics){
            let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
            // l.renderLyricData();
        }     
    })
}

function fetchOneRandomLyric()
{ 
    let id = Math.floor(Math.random() * (1, 3) + 1)
    fetch(`${baseUrl}/lyrics`)
    .then(resp => resp.json())
    .then(lyrics => {
        for (const lyric of lyrics){
            if(lyric.id == id){
                let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
                l.renderLyricContent();
                return fetch(`${baseUrl}/artists`)
                .then(resp => resp.json())
                .then(artists => {
                    for (const artist of artists){
                        if(artist.id == lyric.artist_id){
                            let a = new Artist(artist.artistName)
                            a.renderArtist();
                            break;
                        }
                       
                    }    
                })
            }
        }    
    })
}

function revealArtist(){
    n = document.getElementById("artist-container")
    n.style.visibility = "visible"
}

// function fetchArtist(){
//     fetch(`${baseUrl}/artists`)
//     .then(resp => resp.json())
//     .then(artists => {
//         for (const artist of artists){
//             if(artist.id == lyric.artist_id)
//             let a = new Artist(artist.artistName)
//             a.renderArtist();
//         }    
//     })
// }

// function fetchOneArtist(id){
//     fetch(`${baseUrl}/artists`)
//     .then(resp => resp.json())
//     .then(artists => {
//         for (const artist of artists){
//             if(artist.id == id){
//                 let a = new Artist(artist.artistName)
//                 a.renderArtist();
//                 break;
//             }
           
//         }    
//     })
// }



    //read- show individual, randomized lyric

    // create - create new lyric (with artist association)

    // delete - delete a lyric


