import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [producers, setProducers] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [stars, setStars] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedProducer, setSelectedProducer] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const result = await axios.get(`${BASE_URL}/movies`);
            setMovies(result.data);
        };

        const fetchProducers = async () => {
            const result = await axios.get(`${BASE_URL}/producers`);
            setProducers(result.data);
        };

        const fetchDirectors = async () => {
            const result = await axios.get(`${BASE_URL}/directors`);
            setDirectors(result.data);
        };

        const fetchStars = async () => {
            const result = await axios.get(`${BASE_URL}/stars`);
            setStars(result.data);
        };

        fetchMovies();
        fetchProducers();
        fetchDirectors();
        fetchStars();
    }, []);

    useEffect(() => {
        const uniqueGenres = [...new Set(movies.flatMap(movie => movie.genres))];
        setGenres(uniqueGenres);
    }, [movies]);

    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
        setSelectedProducer(null);  
        setSelectedDirector(null);  
    };

    const handleProducerSelect = (producerId) => {
        setSelectedProducer(producerId);
        setSelectedGenre(null);  
        setSelectedDirector(null);  
    };

    const handleDirectorSelect = (directorId) => {
        setSelectedDirector(directorId);
        setSelectedGenre(null);  
        setSelectedProducer(null);  
    };

    const filteredMovies = movies.filter(movie => {
        const genreFilter = (movie) => !selectedGenre || movie.genres.includes(selectedGenre);
        const producerFilter = (movie) => !selectedProducer || movie.producer === selectedProducer;
        const directorFilter = (movie) => !selectedDirector || movie.director === selectedDirector;
        return genreFilter(movie) && producerFilter(movie) && directorFilter(movie);
    });

    return (
        <MovieContext.Provider value={{
            movies: filteredMovies,
            producers,
            directors,
            stars,
            genres,
            handleGenreSelect,
            handleProducerSelect,
            handleDirectorSelect,
            setMovies
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieProvider;
