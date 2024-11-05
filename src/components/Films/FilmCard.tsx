import { Link } from "react-router-dom";
import { Film } from "./filmsSlice";

// Define the props type for FilmCard
interface FilmCardProps {
  film: Film; // The prop name should match what you pass when rendering FilmCard
}

// Use the defined props type in the component
export const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  return (
    <Link to={`/film/${film.kinopoiskId}`}>
      <div className="rounded-xl h-full flex flex-col shadow-2xl hover:scale-110 ease-in-out duration-200">
        <img
          src={film.posterUrl}
          alt={film.nameOriginal}
          className="w-auto rounded-t-xl"
        />

        <div className="flex flex-col justify-around flex-grow rounded-b-xl p-2">
          <p className="font-bold text-center text-xl text-white">
            {film.nameRu || film.nameOriginal}
            <span className="text-lg text-accent-1"> ({film.year}) </span>
          </p>
          <div className="text-center font-medium tracking-wide text-sm px-3">
            {film.genres.map((genre, index) => (
              <span className="" key={`${film.kinopoiskId} - ${genre}`}>
                {genre.genre}
                {index < film.genres.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <div className="flex justify-around ">
            <div className="text-center cursor-default" title="Rating">
              <p className="text-accent-1 font-extrabold text-xl">
                {film.ratingImdb}
              </p>
              <p className="text-sm font-bold">IMDB</p>
            </div>
            <div className="text-center cursor-default" title="Rating">
              <p className="text-accent-1 font-extrabold text-xl">
                {film.ratingKinopoisk}
              </p>
              <p className="text-sm font-bold">Кинопоиск</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
