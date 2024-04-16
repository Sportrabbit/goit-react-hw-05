import { useState, useEffect } from "react";
import MovieList from "../../components/movieList/MovieList";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import css from "./HomePage.module.css";

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get(
                    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
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
                alert(error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className={css["home-container"]}>
            <h1 className="home-title">Tranding today</h1>
            {movies.length > 0 ? <MovieList movies={movies} /> : <Loader/>}
        </div>
    );
}