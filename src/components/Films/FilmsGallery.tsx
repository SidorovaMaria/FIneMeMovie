import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { fetchFilmGallery } from "./filmsSlice";

const FilmsGallery = () => {
  const dispatch = useAppDispatch();
  const { films, galleryStatus, error } = useAppSelector(
    (state) => state.films
  );
  const [page, setPage] = useState(1);

  // FTECHING FILMSGALLERY
  useEffect(() => {
    if (galleryStatus === "idle") {
      dispatch(fetchFilmGallery({ page: 2, sortValue: "YEAR" }));
    }
  }, [galleryStatus, films.length]);

  // While Films are loading
  if (galleryStatus === "pending" && films.length === 0) {
    return (
      <div className="text-center p-5">
        <p className="text-5xl">Loading </p>
      </div>
    );
  }
  if (galleryStatus === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center pb-10">
      <div className="text-white grid grid-cols-5 gap-12 w-[90%] mx-auto my-10">
        {films.length > 0 ? (
          films.map((film) => (
            <div>
              <p>{film.nameRu || film.nameOriginal}</p>
              <p>{film.ratingKinopoisk}</p>
              <p>{film.year}</p>
            </div>
          ))
        ) : (
          <div>No films found.</div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default FilmsGallery;
