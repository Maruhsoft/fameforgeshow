import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Tv2, Trophy, Archive, Menu, Settings } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Tv2 className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">Fame Forge</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
              <Link to="/live" className="hover:text-purple-400 transition-colors">Live Stream</Link>
              <Link to="/seasons" className="hover:text-purple-400 transition-colors">Seasons</Link>
              <Link to="/admin" className="hover:text-purple-400 transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 border-t border-gray-700"
            >
              <div className="px-4 py-2 space-y-2">
                <Link to="/" className="block py-2 hover:text-purple-400">Home</Link>
                <Link to="/live" className="block py-2 hover:text-purple-400">Live Stream</Link>
                <Link to="/seasons" className="block py-2 hover:text-purple-400">Seasons</Link>
                <Link to="/admin" className="block py-2 hover:text-purple-400 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Tv2 className="h-6 w-6 text-purple-500" />
              <span className="font-bold">Fame Forge</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;