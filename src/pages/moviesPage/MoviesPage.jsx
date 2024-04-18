import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import css from "./MoviesPage.module.css";

export default function MoviePage() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setSearchQuery(query);
            fetchMovies(query);
        }
    }, [searchParams]);

    const fetchMovies = async (query) => {
        setLoading(true);
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
                {
                    headers: {
                        Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzkyMmZhYzVmMzUxOTFmMDMyMTMxNTEyODI1NzFjYyIsInN1YiI6IjY2MWQyZDE0MWU2NDg5MDE4NmQ1MGUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6rB3ugQqVHQAqKeExrcUBaz9rEORxImENInW1PDugE',
                        Accept: "application/json",
                    },
                }
            );
            setMovies(res.data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: searchQuery });
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} className={css["form"]}>
                <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search movies..."
                className={css["input"]}
                />
                <button type="submit" className={css["btn-submit"]}>Search</button>
            </form>
            {loading && <Loader/>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <MovieList movies={movies}/>}
        </div>
    );
}