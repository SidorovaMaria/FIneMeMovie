import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { fetchFilmGallery } from "./filmsSlice";
import { FilmCard } from "./FilmCard";
import { SortBy, yearsOptions } from "../../utils/templates";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Loading from "../Loading";

const FilmsGallery = () => {
  const dispatch = useAppDispatch();

  const { films, galleryStatus, error } = useAppSelector(
    (state) => state.films
  );
  const [sorting, setSorting] = useState(SortBy[0]);
  const [resort, setResort] = useState(false);
  const [selectedYearRange, setSelectedYearRange] = useState(yearsOptions[0]);
  const [filmsParameters, setFilmsParameters] = useState({
    page: 1,
    sortValue: "RATING",
    fromYear: 1000,
    toYear: 3000,
    fromRating: 0,
    toRating: 10,
  });

  const handleSpecificSort = () => {
    if (selectedYearRange.value !== "All Years") {
      const [fromYear, toYear] = selectedYearRange.value.split("-").map(Number);
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
    setResort(true); // Set resort flag to trigger fetching
  };

  const handleSort = (value) => {
    setSorting(value);
    setFilmsParameters((prevParams) => ({
      ...prevParams,
      sortValue: value.value,
      page: 1, // Use the value directly here
    }));
    // Only trigger the fetch once sorting changes
    setResort(true);
  };
  const handleLoadMore = () => {
    setFilmsParameters((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1, // Increment previous page by 1
    }));
    // Set `resort` to true if needed to trigger a new fetch, or call the fetch function directly here
    setResort(true); // Or directly call fetch if applicable
  };

  // FETCHING FILMSGALLERY
  useEffect(() => {
    if (
      galleryStatus === "idle" ||
      (resort === true && galleryStatus == "succeeded")
    ) {
      dispatch(fetchFilmGallery(filmsParameters));
      console.log("Fetched");
      setResort(false); // Reset resort flag after fetching
    }
  }, [galleryStatus, filmsParameters, resort]);

  // While Films are loading
  if (galleryStatus === "pending" && films.length === 0) {
    return (
      <div className="text-center p-5">
        <div className="text dispatch(fetchFilmGallery(filmsParameters));-5xl">
          <Loading />
        </div>
      </div>
    );
  }
  if (galleryStatus === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pb-10">
      <div className="flex justify-end my-5 md:mx-6 ">
        <Listbox value={sorting} onChange={handleSort}>
          <div className="w-max relative">
            <ListboxButton className="relative w-max cursor-default rounded-md bg-color-background text-color-text_light py-3 pl-3 pr-12 text-left shadow-md ring-1 ring-inset ring-accent-1 focus:outline-none focus:ring-2 focus:ring-accent-3 text-base lg:text-xl">
              <span className="flex items-center">
                <span className="ml-3 block font-bold tracking-wider">
                  {sorting.label}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-color-text_light"
                />
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10  w-full right-0 overflow-auto rounded-md bg-white/70 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {SortBy.map((sortOption) => (
                <ListboxOption
                  key={sortOption.value}
                  value={sortOption}
                  className="group relative cursor-default select-none py-2 pl-2 pr-6 text-gray-900 data-[focus]:bg-accent-3 data-[focus]:text-white"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {sortOption.label}
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
      </div>
      <div className="flex md:ml-10 gap-5 mx-1">
        <div className="py-5  hidden">
          <h3 className="text-base lg:text-xl font-bold  text-center my-2">
            Отсортировать фильмы
          </h3>
          <hr />
          <Listbox value={selectedYearRange} onChange={setSelectedYearRange}>
            <Label className="block text-base mt-3 lg:pl-2 lg:text-left font-bold text-color-text text-center ">
              By Year
            </Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-color-background text-color-text_light py-2 lg:pl-2 text-left font-bold text-sm  shadow-xl ring-1 ring-inset ring-accent-1 focus:outline-none focus:ring-2 focus:ring-accent-3">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedYearRange.label}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-color-text_light"
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
                    value={year}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-accent-3 data-[focus]:text-white"
                  >
                    <div className="flex items-center">
                      <span className="lg:ml-3 block text-xs lg:text-base truncate font-normal group-data-[selected]:font-semibold">
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
          <div className="flex justify-center my-4">
            <button
              onClick={handleSpecificSort}
              className="w-max text-lg text-text py-1 px-4 rounded-xl font-bold tracking-wider bg-accent-3 hover:bg-accent-1 hover:text-color-background hover:scale-110 active:scale-100 "
            >
              Sort
            </button>
          </div>
        </div>
        <div className="text-white grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-12 mx-auto">
          {films.length > 0 ? (
            films.map((film, index) => {
              console.log(`${film.kinopoiskId}-10`);
              return <FilmCard film={film} key={`${film.imdbId}`} />;
            })
          ) : (
            <div>No films found.</div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleLoadMore}
          disabled={galleryStatus == "idle"}
          className="mx-auto bg-accent-1 px-5 py-3 text-xl font-extrabold rounded-md shadow-xl tracking-wider border-2 border-transparent text-color-background hover:bg-transparent hover:text-accent-1 hover:border-2 hover:border-accent-1 transition-all duration-200 my-5 box-border active:shadow-white"
        >
          {galleryStatus === "pending" ? "Loading..." : "More Films"}
        </button>
      </div>
    </div>
  );
};

export default FilmsGallery;
