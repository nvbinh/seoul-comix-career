import React, { useState, useEffect, useMemo, useCallback } from "react";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import ImageSlider from "@/components/ImageSlider";
interface RestaurantProps {
  id: string;
  name: string;
  desc: string;
  rating: number;
  rating_count: number;
  categoryId: string;
  category?: string;
  city: string;
  images: string[];
  price_range: string;
  featuredId: string | null;
  featured?: string;
  isFavorite: boolean;
}

const Restaurants: React.FC<{ category: string; name: string }> = ({
  category,
  name,
}) => {
  const [restaurants, setRestaurants] = useState<RestaurantProps[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = useMemo(
    () => ({
      ...(category ? { categoryValue: category } : {}),
      name,
    }),
    [category, name]
  );

  const {
    data,
    isLoading: queryLoading,
    refetch,
  } = trpc.restaurant.getRestaurants.useQuery(queryParams, {
    enabled: !category || !name, // Only enable the query if category and name is provided
  });

  const addFavoriteMutation = trpc.restaurant.addFavorite.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddFavorite = useCallback(
    (id: string) => {
      addFavoriteMutation.mutate(id);
    },
    [addFavoriteMutation]
  );

  useEffect(() => {
    if (data && !queryLoading) {
      // setRestaurants(data);
      setRestaurants(
        data.map((res) => ({
          ...res,
          category: res.category?.value || "", // Convert category object to string
          featured: res.featured?.text || "", // Convert featured object to string
        }))
      );
      setIsLoading(false);
    }
  }, [data, queryLoading]);

  if (isLoading) return <p>Loading...</p>;

  return restaurants?.map((res) => (
    <div key={res.id} className="py-4">
      <div className="bg-white rounded-lg overflow-hidden relative">
        {res.images.length <= 1 && (
          <Image
            src={res.images[0] || "https://picsum.photos/seed/picsum/400/300"}
            alt="Yakitori dish"
            className="w-full h-48 object-cover"
            width={416}
            height={192}
            unoptimized
          />
        )}
        {res.images.length > 1 && <ImageSlider images={res.images} />}
        <button
          className={`absolute top-4 right-4 bg-opacity-50 rounded-full text-white font-bold p-2 shadow-md ${
            res.isFavorite ? "bg-red-500" : "bg-gray-500"
          }`}
          onClick={() => handleAddFavorite(res.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
        </button>
        <div className="p-4">
          {res.isFavorite && (
            <h2 className="text-orange-500 text-sm font-bold flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-stars"
                viewBox="0 0 16 16"
              >
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
              </svg>
              나카노시마×야키토리 상위 맛집
            </h2>
          )}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold max-w-xs truncate ...">
              {res.name}
            </h1>
            <span className="text-sm flex gap-1 items-center w-21">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="text-yellow-500"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              {res.rating} ({res.rating_count})
            </span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs truncate ...">
            {res.desc}
          </p>
          <div className="mt-2 text-gray-500 text-sm">
            오사카 나카노시마 · 야키토리 · {res.price_range}만원
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Restaurants;
