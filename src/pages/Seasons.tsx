import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Instagram, Twitter, ChevronDown } from 'lucide-react';
import { Season } from '../types';

interface SeasonsProps {
  seasons: Season[];
}

interface SearchResults {
  seasons: Season[];
  contestants: {
    contestant: {
      id: string;
      name: string;
      age: number;
      imageUrl: string;
      skill: string;
      socialLinks: {
        instagram: string;
        twitter: string;
      };
      status: 'active' | 'exited' | 'disqualified' | 'winner';
    };
    seasonInfo: {
      id: number;
      theme: string;
      year: number;
    };
  }[];
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'winner':
      return 'bg-yellow-500/20 text-yellow-400'; // Gold for winners
    case 'active':
      return 'bg-green-500/20 text-green-400'; // Green for active
    case 'exited':
      return 'bg-gray-500/20 text-gray-400'; // Gray for those who left
    case 'disqualified':
      return 'bg-red-500/20 text-red-400'; // Red for disqualified
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const Seasons: React.FC<SeasonsProps> = ({ seasons }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSeason, setSelectedSeason] = React.useState<Season>(seasons[0]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResults>({
    seasons: seasons,
    contestants: []
  });

  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults({
        seasons: seasons,
        contestants: []
      });
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    
    // Search through seasons
    const matchedSeasons = seasons.filter(season => 
      season.theme.toLowerCase().includes(searchLower) ||
      season.year.toString().includes(searchLower)
    );

    // Search through all contestants across all seasons
    const matchedContestants = seasons.flatMap(season => 
      season.contestants
        .filter(contestant =>
          contestant.name.toLowerCase().includes(searchLower) ||
          contestant.skill.toLowerCase().includes(searchLower)
        )
        .map(contestant => ({
          contestant,
          seasonInfo: {
            id: season.id,
            theme: season.theme,
            year: season.year
          }
        }))
    );

    setSearchResults({
      seasons: matchedSeasons,
      contestants: matchedContestants
    });
  }, [searchTerm, seasons]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Seasons Archive
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Explore our past seasons and discover amazing talents
        </p>
        
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl flex items-center space-x-3 text-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            <span>{selectedSeason.theme} ({selectedSeason.year})</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-2 w-56 rounded-xl bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
              >
                <div className="py-1">
                  {seasons.map(season => (
                    <button
                      key={season.id}
                      onClick={() => {
                        setSelectedSeason(season);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-sm hover:bg-gray-700 transition-colors ${
                        selectedSeason.id === season.id ? 'bg-purple-600' : ''
                      }`}
                    >
                      {season.theme} ({season.year})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search seasons or contestants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>
      </div>

      {searchTerm && searchResults.seasons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Matching Seasons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.seasons.map(season => (
              <motion.div
                key={season.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 cursor-pointer"
                onClick={() => {
                  setSelectedSeason(season);
                  setSearchTerm("");
                }}
              >
                <h3 className="text-xl font-bold mb-2">{season.theme}</h3>
                <p className="text-purple-400">{season.year}</p>
                <p className="text-gray-400 mt-2">{season.contestants.length} contestants</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {(searchTerm ? searchResults.contestants : selectedSeason.contestants).map(item => {
            const contestant = searchTerm ? item.contestant : item;
            const seasonInfo = searchTerm ? item.seasonInfo : null;
            
            return (
              <motion.div
                key={contestant.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <img
                    src={contestant.imageUrl}
                    alt={contestant.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{contestant.name}</h3>
                      <p className="text-gray-400">{contestant.age} years old</p>
                      {seasonInfo && (
                        <p className="text-purple-400 text-sm mt-1">
                          {seasonInfo.theme} ({seasonInfo.year})
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(contestant.status)}`}>
                      {contestant.status}
                    </span>
                  </div>
                  
                  <p className="text-purple-400 font-medium mb-6 text-lg">{contestant.skill}</p>
                  
                  <div className="flex space-x-4">
                    <a
                      href={`https://instagram.com/${contestant.socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href={`https://twitter.com/${contestant.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Seasons;