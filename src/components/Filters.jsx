import React from "react";

export default function Filters({ sortOrder, setSortOrder, genres, selectedGenre, setSelectedGenre }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Top Rated</option>
        <option value="release_date.desc">Latest Releases</option>
      </select>

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-pink-500"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
}
