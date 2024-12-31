import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Italian",
    icon: <FaPizzaSlice />,
    path: "cuisines/Italian",
  },
  {
    name: "American",
    icon: <FaHamburger />,
    path: "cuisines/American",
  },
  {
    name: "Thai",
    icon: <GiNoodles />,
    path: "cuisines/Thai",
  },
  {
    name: "Japanese",
    icon: <GiChopsticks />,
    path: "cuisines/Japanese",
  },
];

const Category = () => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category) => (
        <NavLink
          to={`/${category.path}`}
          key={category.name}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 
            rounded-full cursor-pointer transform transition-all duration-200 
            hover:scale-110 hover:-translate-y-1 
            ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300"
            }`
          }
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl mb-1"
          >
            {category.icon}
          </motion.div>
          <p className="text-xs sm:text-sm font-medium">{category.name}</p>
        </NavLink>
      ))}
    </motion.div>
  );
};

export default React.memo(Category);
