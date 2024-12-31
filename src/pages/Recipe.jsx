import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const LoadingSkeleton = () => (
  <div className="animate-pulse max-w-4xl mx-auto p-4">
    <div className="h-8 w-3/4 bg-gray-200 rounded mb-8"></div>
    <div className="aspect-video w-full bg-gray-200 rounded-lg mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
      <div>
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_FOOD_API_KEY}`
        );

        if (!response.ok) {
          if (response.status === 402) {
            throw new Error("API quota exceeded. Please try again tomorrow.");
          }
          if (response.status === 401) {
            throw new Error("Invalid API key. Please check your configuration.");
          }
          throw new Error(`Failed to fetch recipe: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error("Recipe fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Recipe</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Recipe Not Found</h2>
        <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {recipe.title}
      </motion.h2>

      <motion.div
        className="mb-8 rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Summary</h3>
          <div
            className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Instructions</h3>
          <div
            className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Ingredients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipe.extendedIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                loading="lazy"
              />
              <p className="text-center text-sm font-medium text-gray-700">
                {ingredient.original}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Recipe);
