import { useEffect, useState, useRef } from "react";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { useParams, Outlet, NavLink, Link, useLocation } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    {
                        headers: {
                            Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzkyMmZhYzVmMzUxOTFmMDMyMTMxNTEyODI1NzFjYyIsInN1YiI6IjY2MWQyZDE0MWU2NDg5MDE4NmQ1MGUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6rB3ugQqVHQAqKeExrcUBaz9rEORxImENInW1PDugE',
                            Accept: "application/json",
                        },
                    }
                );
                setMovie(response.data);
            } catch (error) {
                throw error;
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    useEffect(() => {
        if (location.state && location.state.from) {
            backLinkRef.current = location.state.from;
        }
    }, [location.state]);

    if (!movie || !movie.title) {
        return <Loader/>
    }

    return (
        <div className={css["detail-container"]}>
            <Link
            to={location.state?.from || "/movies"}
            ref={backLinkRef}
            className="btn-go-back" 
            >Go back</Link>
            <div className={css["container-det-movie"]}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                alt={movie.title} 
                className={css["img-movie"]}
                />
                <div className={css["container-detail"]}>
                    <h2>{movie.title}</h2>
                    <div className={css["overview-container"]}>
                        <p className={css["overview-title"]}>Overview</p>
                        <p>{movie.overview}</p>
                    </div>
                    <p>
                        <span className={css["rating-title"]}>Average rating:</span>{""}
                        {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </p>
                    <p>
                        <span className={css["release-title"]}>Release Date:</span>{""}
                        {movie.release_date}
                    </p>
                </div>
            </div>
            <div className={css["btn-links"]}>
                <NavLink
                to={`/movies/${movieId}/cast`}
                className={css["btn-links-item"]}
                >Cast</NavLink>
                <NavLink
                to={`/movies/${movieId}/reviews`}
                className={css["btn-links-item"]}
                >
                    Reviews
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
}