import "../css/Favourites.css" // imports the favourite stylesheet
import { useMovieContext } from "../contexts/MovieContext" // imports useMovieContext
import MovieCard from "../components/MovieCard" // imports MovieCard

function Favourites() { // favourites page component
    const {favourites} = useMovieContext() // extracts favourites related components from useMovieContext

    if (favourites.length > 0) { // checks if there are any favourites in the array
        return ( // HTML return if more than 0 favourites
            <div className="favourites"> {/* div for favourites page */}
            <h2>Your Favourites</h2>  {/* favourites page title */}
            <div className="movies-grid"> {/* div for movies grid */}
                {favourites.map((movie) => ( // creates a dynamic list of movies (going through each movie in favourites array) and passes that movie object into MovieCard
                    <MovieCard // renders a MovieCard for each movie
                        movie={movie} // extracts the and stores the current movie in the variable movie
                        key={movie.id} // gives each card a stable key
                    />
                ))}
            </div>
            </div>
        )
    }

    return ( // HTML return if no movies favourited
        <div className="favourites-empty"> {/* div for empty movie array */}
            <h2>No Favourite Movies Yet</h2> {/* h2 for no movies */}
            <p>Start adding movies to your favourites and they will appear here</p> {/* p for no movies */}
        </div>
    )
}

export default Favourites // default export of Favourites