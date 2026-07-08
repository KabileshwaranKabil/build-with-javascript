const apiKey = "5b982eff"

function search(){
    let movieName = document.getElementById("movie-name").value
    let url = ` http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`
    
    let httpRequest = new XMLHttpRequest()

    httpRequest.open("GET",url)
    httpRequest.responseType="json"

    httpRequest.send()

    httpRequest.onload=function(){
        let movie = httpRequest.response
        console.log(movie)

        document.getElementById("title").innerText=movie.Title
        document.getElementById("plot").innerText=movie.Plot
        document.getElementById("poster").src=movie.Poster
        document.getElementById("director").innerText=`Director: ${movie.Director}`
        document.getElementById("rating").innerText=`IMDB Rating: ${movie.imdbRating}`
        document.getElementById("genre").innerText=`Genre: ${movie.Genre}`

    }
}