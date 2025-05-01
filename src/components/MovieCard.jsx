import React from "react";

export default function MovieCard({ movie }) {
  const imageBase = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      <img
        src={imageBase + movie.poster_path}
        alt={movie.title}
        className="rounded-lg mb-3 w-full h-72 object-cover"
      />
      <h2 className="text-xl font-bold text-white truncate mb-1">{movie.title}</h2>
      <p className="text-sm text-gray-400">⭐ {movie.vote_average}</p>
    </div>
  );
}