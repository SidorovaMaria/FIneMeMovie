import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { FetchFilmDetails, Trailer } from "./filmsSlice";
import { useEffect } from "react";
import { BudgetCountry, ShowTrailer } from "../../utils/helperFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFaceSadTear,
  faFaceSadCry,
} from "@fortawesome/free-solid-svg-icons";

import Loading from "../Loading";
import { Error404 } from "../Error404";

const FilmPage = () => {
  const { filmId } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(
    (state) => state.films.filmDetails[Number(filmId)]
  );
  const filmPageStatus = useAppSelector((state) => state.films.filmPageStatus);

  useEffect(() => {
    if (filmId && !film) {
      dispatch(FetchFilmDetails(Number(filmId)));
      // Dispatch action to fetch film details
    }
  }, [filmId, dispatch, film]); // Dependencies: Only fetch again if filmId or film changes

  if (filmPageStatus === "pending") {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // Render Error 404 message if the film data is not found or there's an error
  if (filmPageStatus === "rejected" || !film) {
    return (
      <>
        <Error404 msg={"Film  not found =("} />
      </>
    );
  }
  console.log(film.trailers);
  let avalableTrailer: Trailer[] = [];
  if (film.trailers) {
    avalableTrailer = film.trailers
      .filter((item: Trailer) => item.site === "YOUTUBE")
      .slice(0, 8);
  }
  console.log(avalableTrailer);
  return (
    <div>
      <div className="flex items-center">
        <Link
          to={`/`}
          className="my-4 text-center mx-auto font-extrabold bg-red px-4 py-3 border-2 rounded-xl  text-lg tracking-wide text-accent-1 shadow-lg shadow-accent-2 flex flex-row justify-center items-center gap-4
          hover:translate-y-1 hover:shadow-none hover:bg-accent-3 hover:text-white transition-all duration-300 ease-in-out capitalize 
          lg:absolute md:z-20  md:top-3 md:left-10"
          // className=" md:absolute z-20  top-8 left-10 "
        >
          <div className="inline text-3xl text-white">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          Вернуться
        </Link>
      </div>
      <div className="py-8 px-6 ">
        <div className="flex flex-col justify-center items-center lg:flex-row gap-10 ">
          {/* Image and Trailer */}
          <div className="">
            <img
              src={film.posterUrl}
              className="w-auto  max-w-80 md:max-w-96 rounded-xl"
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
                    <span key={`${film.kinopoiskId} - ${index}`}>
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
                <div className="text-accent-1 text-lg  text-right font-bold ">
                  {film.boxOffice?.map((budget) => (
                    <BudgetCountry key={budget.type} budget={budget} />
                  ))}
                </div>
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

        {avalableTrailer && avalableTrailer.length !== 0 ? (
          <div>
            <h4 className="font-bold text-2xl my-5 tracking-wider text-center lg:text-left">
              Трейлеры
            </h4>
            <div className="flex gap-10 overflow-x-auto items-start">
              {avalableTrailer.map((item) => (
                <ShowTrailer key={item.url} trailer={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-[50%] mx-auto my-6 text-center font-bold text-xl ">
            <FontAwesomeIcon
              icon={faFaceSadTear}
              className="text-[5rem] text-white mb-5"
            />
            <h1 className="">
              На данный момент у нас нет трейлера, который можно было бы
              показать
            </h1>
          </div>
        )}
        {film.similarFilms && film.similarFilms.length != 0 ? (
          <div className="w-[80%] mx-auto my-6">
            <h4 className="font-bold text-2xl my-5 tracking-wider text-center lg:text-left ">
              Похожие фильмы
            </h4>
            <div className="flex gap-10 overflow-x-auto items-start ">
              {film.similarFilms.map((item, index) => {
                return (
                  <Link
                    to={`/film/${item.filmId}`}
                    key={`${item.filmId}-${index}`}
                  >
                    <div className="rounded-xl h-full justify-between flex flex-col shadow-2xl">
                      <img
                        src={item.posterUrl}
                        className="rounded-xl min-w-40 aspect-[9:16] object-cover"
                      />
                      <h1 className="text-lg font-semibold place-items-start p-3 text-center">
                        {item.nameRu}
                      </h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-[50%] mx-auto my-6 text-center font-bold text-xl ">
            <FontAwesomeIcon
              icon={faFaceSadCry}
              className="text-[5rem] text-white mb-5"
            />
            <h1>Похожих фильмов не найдено </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmPage;
