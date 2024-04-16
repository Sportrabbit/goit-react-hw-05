import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

export default function MovieCast() {
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const {movieId} = useParams();

    useEffect(() => {
        const fetchMovieCast = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
                    {
                        headers: {
                            Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzkyMmZhYzVmMzUxOTFmMDMyMTMxNTEyODI1NzFjYyIsInN1YiI6IjY2MWQyZDE0MWU2NDg5MDE4NmQ1MGUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6rB3ugQqVHQAqKeExrcUBaz9rEORxImENInW1PDugE',
                            Accept: "application/json",
                        },
                    }
                );
                setCast(res.data.cast);
            } catch (error) {
                setError("Something went wrong, try again", error)
            }
        };
        fetchMovieCast();
    }, [movieId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className={css["casts-title"]}>Casts</h2>
            <ul className={css["casts-list"]}>
                {cast.map((actor, idx) => (
                    <li key={idx}>
                        <div className={css["cast-info"]}>
                            {actor.profile_path ? (
                                <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} 
                                alt={actor.name} />
                            )}
                            {actor.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}