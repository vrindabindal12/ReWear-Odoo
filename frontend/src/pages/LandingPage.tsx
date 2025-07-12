import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Users, ShoppingBag, Shirt, Watch, Footprints, Baby, Sparkles, Umbrella } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data/mockData';

interface LandingPageProps {
  onNavigate: (page: string, itemId?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const featuredItems = mockItems.slice(0, 4);

  const categories = [
    {
      icon: <Shirt className="h-8 w-8" />,
      title: 'Tops',
      description: 'Discover a variety of shirts, blouses, and sweaters for all styles.'
    },
    {
      icon: <Watch className="h-8 w-8" />,
      title: 'Accessories',
      description: 'Find unique jewelry, bags, and scarves to complete your look.'
    },
    {
      icon: <Footprints className="h-8 w-8" />,
      title: 'Footwear',
      description: 'Explore sneakers, boots, and heels for every occasion.'
    },
    {
      icon: <Baby className="h-8 w-8" />,
      title: 'Kids',
      description: 'Swap adorable outfits for children of all ages.'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Dresses',
      description: 'Browse elegant dresses for casual or formal wear.'
    },
    {
      icon: <Umbrella className="h-8 w-8" />,
      title: 'Outerwear',
      description: 'Stay warm with stylish jackets, coats, and vests.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Items Swapped' },
    { number: '5K+', label: 'Happy Users' },
    { number: '50K+', label: 'CO2 Saved (lbs)' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  // Animation variants for the hero section
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation for stats cards
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { y: -10, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
        <div className="absolute inset-0">
          <div className="absolute top-24 left-24 w-96 h-96 bg-white/10 rounded-full blur-4xl"></div>
          <div className="absolute bottom-24 right-24 w-128 h-128 bg-emerald-300/15 rounded-full blur-4xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tight"
              variants={itemVariants}
            >
              Swap, Share, and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-200"> Sustain</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-12 text-green-50/90 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Transform your wardrobe while protecting the planet. Exchange unused clothing through direct swaps or our point-based system.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => user ? onNavigate('browse') : onNavigate('auth')}
                className="bg-white text-green-600 px-6 py-3 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Swapping</span>
                <ArrowRight className="h-6 w-6" />
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('browse')}
                className="border-2 border-white/50 text-white px-6 py-3 rounded-2xl font-bold hover:bg-white hover:text-green-700 transition-all duration-300 backdrop-blur-sm text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Items
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center justify-center space-x-3 text-green-50/95"
                variants={statsVariants}
                whileHover="hover"
              >
                <div className="p-3 rounded-full bg-green-200/20 backdrop-blur-sm">
                  <Recycle className="h-8 w-8 text-green-200" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">10K+</div>
                  <div className="text-sm font-medium">Items Swapped</div>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center space-x-3 text-green-50/95"
                variants={statsVariants}
                whileHover="hover"
              >
                <div className="p-3 rounded-full bg-green-200/20 backdrop-blur-sm">
                  <Users className="h-8 w-8 text-green-200" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">5K+</div>
                  <div className="text-sm font-medium">Active Members</div>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center space-x-3 text-green-50/95"
                variants={statsVariants}
                whileHover="hover"
              >
                <div className="p-3 rounded-full bg-green-200/20 backdrop-blur-sm">
                  <ShoppingBag className="h-8 w-8 text-green-200" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">50+</div>
                  <div className="text-sm font-medium">Categories</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Shop by Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Find exactly what you're looking for. Let's make fashion more sustainable, one swap at a time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {categories.map((category, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Discover amazing pieces from our community
            </p>
          </div>
          
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredItems.map((item, index) => (
                <ItemCard
                  key={item.id ?? index}
                  item={item}
                  onClick={() => onNavigate('item-detail', item.id)}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => onNavigate('browse')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>View All Items</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-6xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-green-100 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            Join our community today and make a positive impact on the environment while refreshing your wardrobe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => user ? onNavigate('add-item') : onNavigate('auth')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              List Your First Item
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className="border-2 border-green-600 text-green-600 dark:text-green-400 px-10 py-4 rounded-2xl font-bold hover:bg-green-600 hover:text-white dark:hover:text-white transition-all duration-300"
            >
              Browse Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;