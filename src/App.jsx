import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";
import { GiKnifeFork } from "react-icons/gi";
import { motion } from "framer-motion";

const App = () => {
  return (
    <Router basename="/react-recipe-app">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav className="py-4 md:py-6 flex items-center justify-between flex-wrap">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              aria-label="Home"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <GiKnifeFork className="text-2xl sm:text-3xl text-orange-500" />
              </motion.div>
              <span className="text-xl sm:text-2xl font-medium font-lobster text-gray-800 group-hover:text-orange-500 transition-colors">
                Recipe-App
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              {/* Add mobile menu button if needed */}
            </div>
          </nav>

          {!process.env.REACT_APP_FOOD_API_KEY ? (
            <motion.div 
              className="text-center mt-4 p-6 bg-white rounded-lg shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">API Key Required</h2>
              <p className="text-gray-600 mb-4">
                Please get the API key from{" "}
                <a
                  href="https://spoonacular.com/food-api/"
                  className="text-orange-500 hover:text-orange-600 font-medium underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spoonacular Food API
                </a>
              </p>
              <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                <p>Add it in your <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file with the name:</p>
                <code className="block mt-2 bg-gray-100 p-2 rounded">
                  REACT_APP_FOOD_API_KEY=your_api_key_here
                </code>
              </div>
              <p className="mt-4 text-gray-600">Then restart the app to apply changes.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 pb-8"
            >
              <Search />
              <Category />
              <Pages />
            </motion.div>
          )}
        </div>
      </motion.div>
    </Router>
  );
};

export default App;
