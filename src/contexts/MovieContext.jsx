import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [ favourites, setFavourites ] = useState(() => {
        const storedFavs = localStorage.getItem("favourites")

        if (!storedFavs) return []

        try {
            const parsedFavs = JSON.parse(storedFavs)
            return Array.isArray(parsedFavs) ? parsedFavs : []
        } catch (error) {
            console.error("Failed to parse saved favourites.", error)
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }, [favourites])

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev, movie]) // how you add a value to array.
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}