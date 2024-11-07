import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const kinoPoiskApi = import.meta.env.VITE_KINOPOISK_API;
interface FilmsState {
  films: Film[];
  filmDetails: { [filmId: number]: Film };
  galleryStatus: "idle" | "pending" | "succeeded" | "rejected";
  filmPageStatus: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

export interface Film {
  kinopoiskId: number;
  nameRu?: string;
  nameOriginal?: string;
  posterUrl?: string;
  ratingKinopoisk?: number;
  ratingImdb?: number;
  year?: number;
  description?: string;
  shortDescription?: string;
  genres: Genre[];
  boxOffice?: Budget[];
  similarFilms: SimilarFilm[];
}
export interface Genre {
  genre: string;
}
export interface Budget {
  type: string;
  amount: number;
  symbol: string;
}
export interface SimilarFilm {
  filmId: number;
  nameRu: string;
  nameoriginal: string;
  posterUrl: string;
}

const initialState: FilmsState = {
  films: [],
  filmDetails: {},
  galleryStatus: "idle",
  filmPageStatus: "idle",
  error: null,
};
interface FetchGalleryArgs {
  page?: number;
  sortValue?: string;
  fromYear?: number;
  toYear?: number;
  fromRating?: number;
  toRating?: number;
}
export const fetchFilmGallery = createAsyncThunk(
  "films/fetchGallery",
  async ({
    page = 1,
    sortValue = "RATING",
    fromYear = 2000,
    toYear = 2030,
    fromRating = 0,
    toRating = 10,
  }: FetchGalleryArgs) => {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=2&order=${sortValue}&type=ALL&ratingFrom=${fromRating}&ratingTo=${toRating}&yearFrom=${fromYear}&yearTo=${toYear}&page=${page}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": kinoPoiskApi,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return { films: data.items as Film[], page, sortValue };
  }
);
export const FetchFilmDetails = createAsyncThunk(
  "films/fetchDetails",
  async (filmId: number) => {
    const responseDetails = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": kinoPoiskApi,
          "Content-Type": "application/json",
        },
      }
    );
    const responseBudget = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/box_office`,
      {
        method: "GET",
        headers: {
          "X-API-Key": kinoPoiskApi,
          "Content-Type": "application/json",
        },
      }
    );
    const responseSimilarFilms = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}/similars`,
      {
        method: "GET",
        headers: {
          "X-API-Key": kinoPoiskApi,
          "Content-Type": "application/json",
        },
      }
    );
    const dataDetails = await responseDetails.json();
    const dataBudget = await responseBudget.json();
    const similarFilms = await responseSimilarFilms.json();
    return {
      filmId,
      details: dataDetails,
      budget: dataBudget.items,
      similars: similarFilms.items,
    };
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmGallery.pending, (state) => {
        state.galleryStatus = "pending";
      })
      .addCase(fetchFilmGallery.fulfilled, (state, action) => {
        state.galleryStatus = "succeeded";
        if (action.payload.page > 1) {
          state.films = [...state.films, ...action.payload.films];
        } else {
          state.films = action.payload.films;
        }
      })
      .addCase(fetchFilmGallery.rejected, (state, action) => {
        state.galleryStatus = "rejected";
        state.error = action.error.message || "Failed to fetch films";
      })
      .addCase(FetchFilmDetails.rejected, (state, action) => {
        state.filmPageStatus = "rejected";
        state.error = action.error.message || "Failed to fetch film details";
      })
      .addCase(FetchFilmDetails.pending, (state) => {
        state.filmPageStatus = "pending";
      })
      .addCase(FetchFilmDetails.fulfilled, (state, action) => {
        state.filmPageStatus = "succeeded";
        const { filmId, details, budget, similars } = action.payload;
        state.filmDetails[filmId] = {
          ...details,
          boxOffice: budget,
          similarFilms: similars,
        };
      });
  },
});
export default filmsSlice.reducer;
