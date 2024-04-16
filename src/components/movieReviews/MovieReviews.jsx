import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

export default function MovieCast() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const {movieId} = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
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
                setReviews(res.data.results);
            } catch (error) {
                setError("Something went wrong, try again", error)
            }
        };
        fetchReviews();
    }, [movieId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className={css["reviews-title"]}>Reviews</h2>
            {reviews.length > 0 ? (
                <ul className={css["review-list"]}>
                    {reviews.map((review, idx) => (
                        <li key={idx} className={css["review-comment"]}>
                            <p className={css["rev-author"]}>{review.author}</p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={css["no-reviews"]}>
                    No reviews yet
                </p>
            )}
        </div>
    );
}