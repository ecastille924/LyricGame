document.addEventListener("DOMContentLoaded", () => {
    fetchOneRandomLyric();
    createForm();
})

const baseUrl = "http://localhost:3000"

function fetchOneRandomLyric(){   
    let n = document.getElementById("artist-container")
    let l = document.getElementById("lyric-info-container")
    let f = document.getElementById("lyric-submit-form")
    let b = document.getElementById("reveal-form-btn")
    b.innerHTML = "Submit Song Lyric"
    n.style.visibility = "hidden"
    l.style.visibility = "hidden"
    f.style.display = "none"
    fetch(`${baseUrl}/artists`)
    .then(resp => resp.json())
    .then(artists => {
        let randomArtist = artists[Math.floor(Math.random() * artists.length)]
        for (const artist of artists){
            if(artist == randomArtist){
                let a = new Artist(artist.artistName, artist.id)
                    a.renderArtist();
                    let id = a.id
                    fetch(`${baseUrl}/artists/${id}/lyrics`)
                    .then(resp => resp.json())
                    .then(lyrics => {
                        let RandomLyr = lyrics[Math.floor(Math.random() * lyrics.length)]
                        for (const lyric of lyrics){
                            if(lyric == RandomLyr){
                                let l = new Lyric(lyric.content, lyric.songName, lyric.albumName, lyric.releaseYear, lyric.genre, lyric.artist_id)
                                l.renderLyricInfo();
                                l.renderLyricContent();
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
    <textarea rows= "4" id="lyric-content" class="new-lyr-form-fields" placeholder= "Song Lyric" oninvalid="this.setCustomValidity('Please enter song lyrics!')" oninput=setCustomValidity('') onkeydown= enterPress(event) required ></textarea><br>
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

function enterPress(event){
    let lBox = document.getElementById("lyric-content")
    let key = event.keyCode;
    if (key == 13) {
        lBox.value += (" /")
    }
}


//Dropdown menu instead?

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
    debugger
    event.preventDefault();
    let artistName = document.getElementById("artist-name").value
    let artist = {
        artistName: artistName
    } 
    checkID(artistName)
    .then((foundArtistArray) => {
        if (!foundArtistArray.length) 
        // artist id doesn't exist, create new artist
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
        fetch(`${baseUrl}/artists/${artist_id}/lyrics`, {
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
    let n = document.getElementById("artist-container")
    n.style.visibility = "visible"
}

function revealLyricInfo(){
    let i = document.getElementById("lyric-info-container")
    i.style.visibility = "visible"
}

function toggleForm(){
    let f = document.getElementById("lyric-submit-form")
    let b = document.getElementById("reveal-form-btn")
    if (f.style.display == "none"){
        f.style.display = "block";
        b.innerHTML = "Hide Form";
    }
    else  {
        f.style.display= "none";
        b.innerHTML = "Submit Song Lyric";
    }
}
           
function clearForm(){
    document.getElementById("new-lyric").reset()
}


    

// function fetchAllRecords(){

//     let artistApiCall = fetch(`${baseUrl}/artists`);
//     let lyricApiCall = fetch(`${baseUrl}/lyrics`);

//     Promise.all([artistApiCall, lyricApiCall])
//     .then(data => Promise.all(data.map(data => data.json())))
//     .then(allData => {
//         let artistResp = allData[0]
//         let lyricResp = allData[1]
//         console.log(artistResp, lyricResp)
//     })
// }




