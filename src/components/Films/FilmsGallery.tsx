import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { fetchFilmGallery } from "./filmsSlice";
import { FilmCard } from "./FilmCard";
import { yearsOptions } from "../../utils/templates";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const FilmsGallery = () => {
  const dispatch = useAppDispatch();
  const { films, galleryStatus, error } = useAppSelector(
    (state) => state.films
  );
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("RATING");

  const [filmsParameters, setFilmsParameters] = useState({
    page: page,
    sortValue: sorting,
    fromYear: 1000,
    toYear: 3000,
    fromRating: 0,
    toRating: 10,
  });

  const [selectedYearRange, setselectedYearRange] = useState(
    yearsOptions[0].label
  );

  const handleSort = () => {
    if (selectedYearRange !== "All Years") {
      const [fromYear, toYear] = selectedYearRange.split("-").map(Number);
      setFilmsParameters((prevParams) => ({
        ...prevParams,
        fromYear,
        toYear,
      }));
    } else {
      // If the selected year range is "All Years"
      setFilmsParameters((prevParams) => ({
        ...prevParams,
        fromYear: 1000,
        toYear: 3000,
      }));
    }
  };

  // FETCHING FILMSGALLERY
  //   useEffect(() => {
  //     if (galleryStatus === "idle") {
  //       dispatch(fetchFilmGallery(filmsParameters));
  //     }

  //   }, [filmsParameters, dispatch]);
  useEffect(() => {
    dispatch(fetchFilmGallery(filmsParameters));
  }, [dispatch, filmsParameters]);

  // While Films are loading
  if (galleryStatus === "pending" && films.length === 0) {
    return (
      <div className="text-center p-5">
        <p className="text dispatch(fetchFilmGallery(filmsParameters));-5xl">
          Loading{" "}
        </p>
      </div>
    );
  }
  if (galleryStatus === "rejected") {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex m-16 gap-5 ">
      <div className="py-5">
        <h3 className="text-xl font-bold text-center my-2">
          Отсортировать фильмы
        </h3>
        <Listbox onChange={setselectedYearRange}>
          <Label className="block text-base  pl-2 font-bold text-color-text ">
            Specific Years
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-color-background font-bold text-base shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-2 ">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selectedYearRange}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {yearsOptions.map((year) => (
                <ListboxOption
                  key={year.value}
                  value={year.value}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {year.label}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <div className="flex justify-center my-2">
          <button
            onClick={handleSort}
            className="w-max text-lg text-text py-2 px-4 rounded-xl font-bold tracking-wider bg-accent-3 hover:bg-accent-1 hover:text-color-background hover:scale-110 active:scale-100 "
          >
            Sort
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-5">
        <div className="text-white grid grid-cols-5 gap-12 mx-auto ">
          {films.length > 0 ? (
            films.map((film) => <FilmCard film={film} key={film.kinopoiskId} />)
          ) : (
            <div>No films found.</div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FilmsGallery;
