import "../css/MovieCard.css" // imports MovieCard stylesheet
import { useMovieContext } from "../contexts/MovieContext" // imports useMovieContext

function MovieCard({ movie }) { // dynamic movie card component
    const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext() // extracts movie related functions from the movie context
    const favourite = isFavourite(movie.id) // checks wether this movie is favourited

    function onFavouriteClick(e) { // a that runs when you click "favourite" on a movie
        e.preventDefault() // prevents the buttons default browser action
        if (favourite) removeFromFavourites(movie.id) // checks if the movie is favourited, if favourited it removes the movie from favourites
            else addToFavourites(movie) // if not favourited it adds to favourites
    }

    return ( // returns an HTML element
        <div className="movie-card"> {/* div for the movie card */}
            <div className="movie-poster"> {/* div for the movie poster */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> {/* adds a img that has the source of the movie poster and an alt title of the movie's title */}
                <div className="movie-overlay"> {/* div for the favourite button */}
                    <button className={`favourite-btn ${favourite ? "active" : ""}`} onClick={onFavouriteClick}> {/* Calls onFavouriteClick when the button is clicked. Also uses a ternary expression to see if movie is favourited for css */}
                        {favourite ? "♥" : "♡"} {/* when favourite = true / false the icon changes */}
                    </button>
                </div>
            </div>
            <div className="movie-info"> {/* div for movie info */}
                <h3>{movie.title}</h3> {/* dynamic h3 that shows movie title */}
                <p>{movie.release_date?.split("-")[0]}</p> {/* dynamic p that shows movie release date, only showing the year */}
            </div>
        </div>
    )
}

export default MovieCard // default export on MovieCard