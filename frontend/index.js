document.addEventListener("DOMContentLoaded", () => {
    fetchOneRandomLyric();
    createForm();
    // fetchAllRecords();
})

const baseUrl = "http://localhost:3000"

function fetchOneRandomLyric(){   
    n = document.getElementById("artist-container")
    l = document.getElementById("lyric-info-container")
    f = document.getElementById("lyric-submit-form")
    b = document.getElementById("reveal-form-btn")
    b.innerHTML = "Submit Lyric Request"
    n.style.visibility = "hidden"
    l.style.visibility = "hidden"
    f.style.display = "none"
    // The argument in math.random should match total DB records
    let id = Math.floor(Math.random() * (54) + 1)
    fetch(`${baseUrl}/lyrics`)
    .then(resp => resp.json())
    .then(lyrics => {
        for (const lyric of lyrics){
            if(lyric.id == id){
                let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
                l.renderLyricInfo();
                l.renderLyricContent();
                fetch(`${baseUrl}/artists`)
                .then(resp => resp.json())
                .then(artists => {
                    for (const artist of artists){
                        if(artist.id == lyric.artist_id){
                            let a = new Artist(artist.artistName)
                            a.renderArtist();
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
    <form id="new-lyric" class="new-lyr-form">
    <textarea rows= "4" id="lyric-content" class="new-lyr-form-fields" placeholder= "Song Lyric" oninvalid="this.setCustomValidity('Please enter song lyrics!')" oninput=setCustomValidity('') required ></textarea><br>
    <input type= "text" id="song-name" class="new-lyr-form-fields" placeholder="Song Title" oninvalid="this.setCustomValidity('Please enter song title!')" oninput=setCustomValidity('') required ><br>
    <input type= "text" id="artist-name" class="new-lyr-form-fields" placeholder= "Artist" oninvalid="this.setCustomValidity('Please enter artist name!')" oninput=setCustomValidity('') required ><br>
    <input type= "text" id="album-name" class="new-lyr-form-fields" placeholder= "Album Name" oninvalid="this.setCustomValidity('Please enter song album name!')" oninput=setCustomValidity('') required ><br>
    <input type= "integer" id="release-year" class="new-lyr-form-fields" placeholder= "Year Released" oninvalid="this.setCustomValidity('Please enter release year!')" oninput=setCustomValidity('') required ><br>
    <input type= "text" id="genre" class="new-lyr-form-fields" placeholder= "Genre" oninvalid="this.setCustomValidity('Please enter genre!')" oninput=setCustomValidity('') required ><br>
    <input onclick="clear() "type= "submit" value= "Submit" class= "button">
    </form>
    `

    lyricForm.addEventListener("submit", () => {
        lyricSubmission();
    })
    
}

function checkID(artistNameInput){
    artistNameInput = document.getElementById("artist-name").value
    return fetch(`${baseUrl}/artists`)
        .then(resp => resp.json())
        .then(artists => {
                let foundArtist = artists.filter(function(artist){
                    return (artist.artistName == artistNameInput)
                })
                return foundArtist
        })
}

function lyricSubmission(){
    event.preventDefault();
    let artistName = document.getElementById("artist-name").value
    let artist = {
        artistName: artistName
    } 
    checkID(artistName)
    .then((foundArtistArray) => {
        if (!foundArtistArray.length) 
        // artist Id doesn't exist, create new artist
        return fetch(`${baseUrl}/artists`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist)
        }) 
        .then(resp => resp.json())
        else
        return foundArtistArray[0]
    })
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
        fetch(`${baseUrl}/lyrics`, {
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
            clearForm()
        })
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

function toggleForm(){
    f = document.getElementById("lyric-submit-form")
    b = document.getElementById("reveal-form-btn")
    if (f.style.display == "none"){
        f.style.display = "block";
        b.innerHTML = "Hide Form";
    }
    else  {
        f.style.display= "none";
        b.innerHTML = "Submit Lyric Request";
    }
}
           
function clearForm(){
    document.getElementById("new-lyric").reset()
}

function fetchAllRecords(){

    let artistApiCall = fetch(`${baseUrl}/artists`);
    let lyricApiCall = fetch(`${baseUrl}/lyrics`);

    Promise.all([artistApiCall, lyricApiCall])
    .then(data => Promise.all(data.map(data => data.json())))
    .then(allData => {
        let artistResp = allData[0]
        let lyricResp = allData[1]
        console.log(artistResp, lyricResp)
    })
}



// fetch artist endpoint 
// convert json to JS object 
// grab a user's input and compare it to artist records
//-- if it matches a record, assign it to that artist ID 

