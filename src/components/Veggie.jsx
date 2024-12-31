import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoadingSkeleton = () => (
  <div className="my-16">
    <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="animate-pulse">
          <div className="h-[25rem] bg-gray-200 rounded-2xl"></div>
        </div>
      ))}
    </div>
  </div>
);

const Veggie = () => {
  const [veggies, setVeggies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVeggies = async () => {
    try {
      const cacheKey = 'veggie_recipes';
      const cacheExpiry = 'veggie_recipes_expiry';
      const getData = localStorage.getItem(cacheKey);
      const getExpiry = localStorage.getItem(cacheExpiry);

      // Check if cache exists and is not expired (1 hour)
      if (getData && getExpiry && Date.now() < parseInt(getExpiry)) {
        setVeggies(JSON.parse(getData));
        setIsLoading(false);
        return;
      }

      const resp = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&tags=vegetarian&number=10`
      );

      if (!resp.ok) {
        if (resp.status === 402) {
          throw new Error('API quota exceeded. Please try again tomorrow.');
        }
        if (resp.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        }
        throw new Error(`Failed to fetch recipes: ${resp.status}`);
      }

      const data = await resp.json();

      if (!data.recipes || !Array.isArray(data.recipes)) {
        throw new Error('Invalid response format from API');
      }

      setVeggies(data.recipes);
      // Cache the data with 1-hour expiry
      localStorage.setItem(cacheKey, JSON.stringify(data.recipes));
      localStorage.setItem(cacheExpiry, (Date.now() + 3600000).toString());

    } catch (error) {
      console.error("Veggie recipes fetch error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVeggies();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="my-16 text-center">
        <h3 className="text-xl font-bold mb-4 text-red-500">Error Loading Vegetarian Picks</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => {
            setIsLoading(true);
            setError(null);
            getVeggies();
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!veggies.length) {
    return (
      <div className="my-16 text-center">
        <h3 className="text-xl font-bold mb-4">No Vegetarian Recipes Available</h3>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="my-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-8">Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: true,
          pagination: true,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            640: { perPage: 1 },
          },
          arrowPath: 'M0.528076 11.5281L8.29808 19.2981C8.88831 19.8883 9.84854 19.8883 10.4388 19.2981C11.029 18.7078 11.029 17.7476 10.4388 17.1574L4.78223 11.5008L19.0008 11.5008C19.8297 11.5008 20.5008 10.8297 20.5008 10.0008C20.5008 9.17187 19.8297 8.50076 19.0008 8.50076L4.78223 8.50076L10.4388 2.84419C11.029 2.25397 11.029 1.29374 10.4388 0.703515C9.84854 0.113291 8.88831 0.113291 8.29808 0.703515L0.528076 8.47352C-0.176025 9.17763 -0.176025 10.824 0.528076 11.5281Z',
        }}
      >
        {veggies.map(({ title, id, image }) => (
          <SplideSlide key={id}>
            <motion.div
              className="relative min-h-[25rem] overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/recipe/${id}`}>
                <motion.p
                  className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center font-semibold text-base w-full py-4 z-10 rounded-b-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {title}
                </motion.p>
                <img
                  src={image}
                  alt={title}
                  className="absolute w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-2xl"></div>
              </Link>
            </motion.div>
          </SplideSlide>
        ))}
      </Splide>
    </motion.div>
  );
};

export default React.memo(Veggie);
