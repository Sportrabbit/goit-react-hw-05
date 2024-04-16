import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
    return(
        <div className={css["not-found-container"]}>
            <p className={css["not-found-text"]}>Not found page</p>
        </div>
    );
}