import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((n) => (
      <div key={n} className="animate-pulse">
        <div className="bg-gray-200 h-56 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded mt-4 mx-auto w-3/4"></div>
      </div>
    ))}
  </div>
);

const ErrorMessage = ({ error, onRetry }) => (
  <div className="text-center p-4">
    <div className="text-red-500 mb-4">
      {error.message || 'Failed to load cuisines'}
    </div>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  onRetry: PropTypes.func.isRequired
};

const Cuisines = () => {
  const [cuisines, setCuisines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const getCuisines = async (name) => {
    try {
      const resp = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&cuisine=${name}`
      );

      if (!resp.ok) {
        if (resp.status === 402) {
          throw new Error('API quota exceeded. Please try again tomorrow.');
        }
        if (resp.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        }
        const errorText = await resp.text();
        throw new Error(`Failed to fetch recipes: ${resp.status} ${errorText}`);
      }

      const data = await resp.json();
      if (!data.results) {
        throw new Error('Invalid response format from API');
      }
      return data.results;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const loadCuisines = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCuisines(params.type);
      setCuisines(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCuisines();
  }, [params.type]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={loadCuisines} />;
  }

  if (cuisines.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No recipes found for {params.type} cuisine.
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisines.map(({ id, title, image }) => (
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
            <h4 className="p-4 text-lg font-medium hover:text-orange-500 transition-colors">{title}</h4>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Cuisines;
