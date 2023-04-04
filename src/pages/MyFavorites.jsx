import React from "react";
import useFavorites from "../hooks/useFavorites";
import ProductCard from "../components/main/product/ProductCard";

export default function MyFavorites() {
  const { favoriteQuery } = useFavorites();
  return (
    <div className="pt-20 px-4">
      <div className="text-center py-2 px-4 border-b">
        <span className="text-2xl font-bold">My Favorites</span>
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 mt-8
        max-w-screen-2xl m-auto px-10 gap-5`}
      >
        {favoriteQuery?.data?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}