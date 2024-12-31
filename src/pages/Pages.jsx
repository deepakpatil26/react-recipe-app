import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

// Lazy load components
const Home = lazy(() => import("./Home"));
const Cuisines = lazy(() => import("./Cuisines"));
const Searched = lazy(() => import("./Searched"));
const Recipe = lazy(() => import("./Recipe"));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  </div>
);

// 404 Page component
const NotFound = () => (
  <div className="text-center p-8">
    <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
    <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
    <a
      href="/"
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
    >
      Go to Home
    </a>
  </div>
);

const Pages = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/cuisines/:type" element={<Cuisines />} />
            <Route path="/searched/:search" element={<Searched />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Pages;
