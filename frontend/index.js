document.addEventListener("DOMContentLoaded", () => {
    // fetchLyrics();
    fetchOneRandomLyric();
    createForm()
})

const baseUrl = "http://localhost:3000"

function fetchOneRandomLyric()
{   n = document.getElementById("artist-container")
    l = document.getElementById("lyric-info-container")
    f = document.getElementById("lyric-submit-form")
    n.style.visibility = "hidden"
    l.style.visibility = "hidden"
    f.style.visibility = "hidden"
    // Second argument in math.random should match total DB records
    let id = Math.floor(Math.random() * (1, 5) + 1)
    fetch(`${baseUrl}/lyrics`)
    .then(resp => resp.json())
    .then(lyrics => {
        for (const lyric of lyrics){
            if(lyric.id == id){
                let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
                l.renderLyricInfo();
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

function createForm(){
    let lyricForm = document.getElementById("lyric-submit-form")
    lyricForm.innerHTML =
    `
    <form id="new-lyric">
    Song Lyric:<br>
    <textarea rows= "4" id="lyric-content" class="lyric-content"></textarea><br>
    Song Title: <input type= "text" id="song-name"><br>
    Artist Name: <input type= "text" id="artist-name"><br>
    Album Name: <input type= "text" id="album-name"><br>
    Year Released: <input type= "integer" id="release-year"><br>
    Genre: <input type= "text" id="genre"><br>
    <input onclick="clear() "type= "submit" value= "Submit" >
    </form>
    `

    lyricForm.addEventListener("submit", () => {
        lyricSubmission();
    })
    
}

function clearForm(){
    document.getElementById("new-lyric").reset()
}


function lyricSubmission(){
    event.preventDefault();
    let artistName = document.getElementById("artist-name").value
    let artist = {
        artistName: artistName
    }
    fetch(`${baseUrl}/artists`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
    })
    .then(resp => resp.json())
    .then(artist => {
        let a = new Artist(artist.artistName, artist.id)
        let content = document.getElementById("lyric-content").value
        let songName = document.getElementById("song-name").value
        let albumName = document.getElementById("album-name").value
        let releaseYear = document.getElementById("release-year").value
        let genre = document.getElementById("genre").value
        let artist_id = a.id
        let lyric = {
            content: content,
            songName: songName,
            releaseYear: releaseYear,
            albumName: albumName,
            genre: genre,
            artist_id: artist_id
        }
        return fetch(`${baseUrl}/lyrics`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lyric)
        })
        .then(res => res.json())
        .then(lyric => { 
            let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
            .then(clearForm())
        })
     })
}


// This fetch request is not being used currently.
function fetchLyrics(){
    fetch(`${baseUrl}/lyrics`)
    .then(resp => resp.json())
    .then(lyrics => {
        for (const lyric of lyrics){
            let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.id)
            // l.renderLyricData();
        }     
    })
}

function revealArtist(){
    n = document.getElementById("artist-container")
    n.style.visibility = "visible"
}

function revealLyricInfo(){
    i = document.getElementById("lyric-info-container")
    i.style.visibility = "visible"
}

function revealForm(){
    f = document.getElementById("lyric-submit-form")
    f.style.visibility = "visible"
}


           




    // create - create new lyric (with artist association)

    // delete - delete a lyric


