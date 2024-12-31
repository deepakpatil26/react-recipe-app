import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <div key={n} className="animate-pulse">
        <div className="bg-gray-200 h-56 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mx-auto w-3/4"></div>
      </div>
    ))}
  </div>
);

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const getSearchedRecipes = async (search) => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&query=${encodeURIComponent(search)}`
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

      if (!data.results) {
        throw new Error('Invalid response format from API');
      }

      return data.results;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getSearchedRecipes(params.search)
      .then((data) => {
        if (isMounted) {
          setSearchedRecipes(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [params.search]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (searchedRecipes.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
        <p className="text-gray-600 mb-4">
          No recipes found for "{params.search}". Try a different search term.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Search Results for "{params.search}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedRecipes.map(({ title, id, image }) => (
          <motion.div
            key={id}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={`/recipe/${id}`}>
              <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <h4 className="p-4 text-lg font-medium hover:text-orange-500 transition-colors">
                {title}
              </h4>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Searched;
