import React, { useEffect, useState, useCallback } from "react";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";

// Debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const API_KEY = "8dc6171eb6bbd6b0975bdd853306a743";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await res.json();
    setGenres(data.genres || []);
  };

  const fetchMovies = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortOrder}`;
    if (selectedGenre) url += `&with_genres=${selectedGenre}`;
    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results || []);
  };

  // Use useCallback with debounce for memoizing the API call
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), [
    query,
    sortOrder,
    selectedGenre,
  ]);

  useEffect(() => {
    fetchGenres();
  }, []);

  // Trigger the debounced fetch when dependencies change
  useEffect(() => {
    debouncedFetchMovies();
  }, [query, sortOrder, selectedGenre, debouncedFetchMovies]);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen px-4 py-6">
      <h1 className="text-5xl font-extrabold text-center mb-8 tracking-tight">
        🎬 Movie Explorer
      </h1>
      <SearchBar query={query} setQuery={setQuery} />
      <Filters
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
