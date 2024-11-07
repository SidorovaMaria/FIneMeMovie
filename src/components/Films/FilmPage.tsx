import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { FetchFilmDetails } from "./filmsSlice";
import { useEffect, useState } from "react";
import { BudgetCountry } from "../../utils/helperFunction";

const FilmPage = () => {
  const { filmId } = useParams();
  const film = useAppSelector(
    (state) => state.films.filmDetails[Number(filmId)]
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filmId && !film) {
      dispatch(FetchFilmDetails(Number(filmId))); // Dispatch action to fetch film details
    }
  }, [filmId, dispatch, film]); // Dependencies: Only fetch again if filmId or film changes

  if (!film) {
    return (
      <section>
        <h2 className="text-5xl">ERROR 404: Film not found</h2>
      </section>
    );
  }
  return (
    <div className="py-10 px-6 ">
      <div className="flex flex-col justify-center items-center lg:flex-row gap-10">
        {/* Image and Trailer */}
        <div className="">
          <img
            src={film.posterUrl}
            className="w-auto  min-w-64 max-w-96 rounded"
            alt={film.nameOriginal}
          />
        </div>
        {/* FILM name and description */}
        <div className="flex flex-col justify-evenly items-center lg:max-w-2xl">
          <div className="m-2 text-center lg:text-left ">
            <h2 className="text-color-text_light font-extrabold text-3xl tracking-wide">
              {film.nameRu || film.nameOriginal}
            </h2>
            <h3 className="my-2 font-bold text-lg text-accent-1 tracking-wide ">
              {film.nameRu ? film.nameOriginal : ""}
            </h3>
            <p className="text-white font-medium">
              {film.shortDescription || film.description}
            </p>
          </div>
          <div className=" w-full border-2 p-6 border-white/50 rounded-xl m-6 flex flex-col gap-5 lg:border-none">
            <h4 className="font-bold tracking-widest text-2xl text-center text-white">
              О фильме
            </h4>
            {/* Year of Production */}
            <div className="flex gap-5 w-full items-center justify-between text-center">
              <h4 className="font-bold text-lightestBlue text-lg text-right">
                Год производства
              </h4>
              <p className="text-accent-1 text-xl font-bold">{film.year}</p>
            </div>
            {/* Genres */}
            <div className="flex gap-10 w-full items-center justify-between text-center">
              <h4 className="font-bold text-lightestBlue text-lg text-right">
                Жанр
              </h4>
              <p className="text-accent-1 text-lg  text-right font-bold ">
                {film.genres.map((genre, index) => (
                  <span className="s" key={`${film.kinopoiskId} - ${genre}`}>
                    {genre.genre}
                    {index < film.genres.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
            {/* BUDGET  */}
            <div className="flex gap-10 w-full items-center justify-between text-center">
              <h4 className="font-bold text-lightestBlue text-lg text-right">
                Собрал в прокате
              </h4>
              <p className="text-accent-1 text-lg  text-right font-bold ">
                {film.boxOffice?.map((budget) => (
                  <BudgetCountry key={budget.type} budget={budget} />
                ))}
              </p>
            </div>
          </div>
        </div>
        {/* RATING  */}
        <div className="flex lg:flex-col justify-center  items-center gap-20 lg:gap-10 ml-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className=" text-base lg:text-xl text-center font-bold ">
              Рейтинг
              <br /> IMDB:
            </p>
            <p className="text-accent-1 font-extrabold text-3xl">
              {film.ratingImdb}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className=" text-base lg:text-xl text-center font-bold ">
              Рейтинг <br />
              Кинопоиск:
            </p>
            <p className="text-accent-1 font-extrabold text-3xl">
              {film.ratingKinopoisk}
            </p>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto my-6">
        <h4 className="font-bold text-2xl my-5 tracking-wider text-center lg:text-left ">
          Похожие фильмы
        </h4>
        <div className="flex gap-10 overflow-x-auto items-start ">
          {film.similarFilms ? (
            film.similarFilms.map((item) => (
              <Link to={`/film/${item.filmId}`}>
                <div
                  key={item.filmId}
                  className="rounded-xl h-full justify-between flex flex-col shadow-2xl "
                >
                  <img
                    src={item.posterUrl}
                    className="rounded-xl min-w-40 aspect-[9:16] object-cover"
                  />{" "}
                  <h1 className="text-lg font-semibold place-items-start p-3 text-center ">
                    {item.nameRu}
                  </h1>
                </div>
              </Link>
            ))
          ) : (
            <div>
              <h1> No Similar films found </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
