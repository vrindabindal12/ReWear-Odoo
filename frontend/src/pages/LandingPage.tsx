import React from 'react';
import { ArrowRight, Recycle, Users, Leaf, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockItems } from '../data/mockData';
import ItemCard from '../components/ItemCard';

interface LandingPageProps {
  onNavigate: (page: string, itemId?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const featuredItems = mockItems.slice(0, 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const features = [
    {
      icon: <Recycle className="h-8 w-8" />,
      title: 'Sustainable Fashion',
      description: 'Give your clothes a second life and reduce textile waste'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Driven',
      description: 'Connect with like-minded fashion enthusiasts in your area'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Eco-Friendly',
      description: 'Make a positive impact on the environment with every swap'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Items Swapped' },
    { number: '5K+', label: 'Happy Users' },
    { number: '50K+', label: 'CO2 Saved (lbs)' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              Swap, Share, and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-200"> Sustain</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-green-50/90 max-w-3xl mx-auto leading-relaxed">
              Transform your wardrobe while protecting the planet. Exchange unused clothing through direct swaps or our point-based system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => user ? onNavigate('browse') : onNavigate('auth')}
                className="bg-white text-green-700 px-10 py-4 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 flex items-center space-x-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-lg"
              >
                <span>Start Swapping</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onNavigate('browse')}
                className="border-2 border-white/50 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-green-700 transition-all duration-300 backdrop-blur-sm text-lg"
              >
                Browse Items
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Why Choose ReWear?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who are making fashion more sustainable, one swap at a time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
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
              {featuredItems.map((item) => (
                <ItemCard
                  key={item.id}
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