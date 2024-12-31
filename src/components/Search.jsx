import React, { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateSearch = useCallback((term) => {
    if (!term.trim()) {
      return "Please enter a search term";
    }
    if (term.length < 2) {
      return "Search term must be at least 2 characters";
    }
    if (term.length > 50) {
      return "Search term must be less than 50 characters";
    }
    return "";
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (error) {
      setError(validateSearch(value));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationError = validateSearch(searchTerm);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    navigate(`/searched/${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 my-4">
      <form
        onSubmit={submitHandler}
        className="relative"
        role="search"
        aria-label="Search recipes"
      >
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">
            Search recipes
          </label>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-input"
              type="search"
              value={searchTerm}
              onChange={handleChange}
              onFocus={() => setError("")}
              placeholder="Search recipes..."
              className={`w-full p-3 pl-10 bg-gray-800 text-white rounded-md 
                transition-all duration-300 ease-in-out
                placeholder-gray-400
                ${error ? 'border-2 border-red-500' : 'border-2 border-transparent'}
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                hover:bg-gray-700`}
              aria-label="Search recipes"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "search-error" : undefined}
              autoComplete="off"
              spellCheck="true"
            />
          </motion.div>
        </div>
        <AnimatePresence>
          {error && (
            <motion.div
              id="search-error"
              className="absolute -bottom-6 left-0 text-red-500 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              role="alert"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default React.memo(Search);
