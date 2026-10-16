import { createContext, useState, useContext, useEffect } from "react" // imports createContext, useState, useContext, and useEffect from react

const MovieContext = createContext(null) // stores movie favourites and related functions for child components

export const useMovieContext = () => useContext(MovieContext) // creates a custom hook for accessing the shared MovieContext

export const MovieProvider = ({children}) => { // provides movie favourites and related functions to child components
    const [ favourites, setFavourites ] = useState(() => { // stores current favourites and provides a function to update them
        const storedFavs = localStorage.getItem("favourites") // extracts favourited items from localStorage to new storedFavs variable

        if (!storedFavs) return [] // checks if there are any storedFavs and stores them in an array

        try { // attempts to turn saved favourites string back into js data
            const parsedFavs = JSON.parse(storedFavs) // converts saved JSON string into a js value
            return Array.isArray(parsedFavs) ? parsedFavs : [] // returns saved array or an empty array if the data is invalid
        } catch (error) { // handles invalid or corrupted saved data
            console.error("Failed to parse saved favourites.", error) // displays error text if error
            return [] // starts with no favourites if the saved data cannot be read
        }
    })

    useEffect(() => { // saves the current favourites to localStorage after the component renders
        localStorage.setItem("favourites", JSON.stringify(favourites)) // converts the favourites array to a JSON string and saves it
    }, [favourites]) // runs on the initial render and whenever favourite change

    const addToFavourites = (movie) => { // adds movie to the favourites array
        setFavourites(prev => [...prev, movie]) // adds movie to the end of the array
    }

    const removeFromFavourites = (movieId) => { // removes movie from favourites array
        setFavourites(prev => prev.filter(movie => movie.id !== movieId)) // finds where the movie is in the array and removes it from there from the id
    }

    const isFavourite = (movieId) => { // checks movie is in favourites array
        return favourites.some(movie => movie.id === movieId) // Returns true if a movie with the given ID is in the favourites list (.some checks wether at least one item matches a condition)
    }

    const value = { // object that groups the shared favourites data and functions for the context
        favourites, // adds favourites
        addToFavourites, // adds addToFavourites
        removeFromFavourites, // adds removeFromFavourites
        isFavourite // adds isFavourite
    }

    return <MovieContext.Provider value={value}> {/* provides the favourites data and functions through MovieContext */}
        {children} {/* renders the components wrapped by MovieProvider */}
    </MovieContext.Provider>
}