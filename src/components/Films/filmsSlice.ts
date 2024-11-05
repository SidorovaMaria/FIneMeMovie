import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const kinoPoiskApi = import.meta.env.VITE_KINOPOISK_API;
interface FilmsState {
  films: Film[];
  galleryStatus: "idle" | "pending" | "succeeded" | "rejected";
  filmPageStatus: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

export interface Film {
  kinoposikId: number;
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
  ganre: string;
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
  galleryStatus: "idle",
  filmPageStatus: "idle",
  error: null,
};
interface FetchGalleryArgs {
  page?: number;
  sortValue?: string;
}
export const fetchFilmGallery = createAsyncThunk(
  "films/fetchGallery",
  async ({ page = 1, sortValue = "RATING" }: FetchGalleryArgs) => {
    const response = await fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=3&genres=2&order=${sortValue}&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`,
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
      });
  },
});
export default filmsSlice.reducer;
