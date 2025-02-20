import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, Timer, ArrowRight, Trophy, Mic2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AppData } from '../types';

interface HomeProps {
  data: AppData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const nextStream = new Date(data.currentStream.nextStreamDate);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=1920"
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/735428933/rendition/720p/file.mp4?loc=external"
            type="video/mp4"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Where Stars Are Born
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl mb-8 text-gray-200"
            >
              Join us on a journey to discover the next generation of talent.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex space-x-4"
            >
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg flex items-center space-x-3 transition-all transform hover:scale-105">
                <Play className="h-5 w-5" />
                <span className="text-lg">Watch Now</span>
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg transition-all transform hover:scale-105 text-lg">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-32" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-gray-800 p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <Trophy className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">2M+</h3>
              <p className="text-gray-400">Viewers Weekly</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-gray-400">Rising Stars</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <Mic2 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">12+</h3>
              <p className="text-gray-400">Performance Categories</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Show Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Next Live Show</h2>
            <p className="text-2xl text-purple-400 font-semibold">
              {formatDistanceToNow(nextStream, { addSuffix: true })}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.seasons[0].contestants.map((contestant, index) => (
              <motion.div
                key={contestant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  <img
                    src={contestant.imageUrl}
                    alt={contestant.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{contestant.name}</h3>
                      <p className="text-purple-400 font-medium">{contestant.skill}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Performances */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Performances</h2>
            <p className="text-gray-400 text-lg">Watch our contestants shine on stage</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Dance Finals",
                image: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800"
              },
              {
                title: "Vocal Showcase",
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800"
              },
              {
                title: "Band Performance",
                image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800"
              }
            ].map((performance, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <img
                  src={performance.image}
                  alt={performance.title}
                  className="w-full h-72 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl flex items-end p-6 opacity-100 group-hover:opacity-90 transition-opacity">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-xl font-bold">{performance.title}</h3>
                    <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900 to-pink-900 p-12 rounded-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920')] opacity-10"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Subscribe to our newsletter for exclusive updates and behind-the-scenes content.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg bg-black/50 border border-purple-500/30 focus:outline-none focus:border-purple-500 text-lg"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg transition-all transform hover:scale-105 text-lg font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;