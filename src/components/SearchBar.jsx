import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="🔍 Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-2xl p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </div>
  );
}