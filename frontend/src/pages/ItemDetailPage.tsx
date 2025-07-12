import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Star, User, MessageCircle, ArrowUpDown } from 'lucide-react';
import { mockItems } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface ItemDetailPageProps {
  itemId: string;
  onNavigate: (page: string, itemId?: string) => void;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ itemId, onNavigate }) => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState<'swap' | 'points'>('swap');
  const [message, setMessage] = useState('');

  const item = mockItems.find(item => item.id === itemId);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Item not found</h2>
          <button
            onClick={() => onNavigate('browse')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'like-new': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'good': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'fair': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const handleSwapRequest = () => {
    if (!user) {
      onNavigate('auth');
      return;
    }
    setShowSwapModal(true);
  };

  const submitSwapRequest = () => {
    // Here you would typically send the swap request to your backend
    console.log('Swap request submitted:', {
      itemId: item.id,
      type: swapType,
      message
    });
    setShowSwapModal(false);
    setMessage('');
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('browse')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Browse</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="text-white font-semibold text-lg">Not Available</span>
                </div>
              )}
            </div>
            
            {item.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index 
                        ? 'border-green-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)} Condition
                </span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {item.pointValue} Points
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Item Details Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</p>
                <p className="text-gray-900 dark:text-white capitalize">{item.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                <p className="text-gray-900 dark:text-white">{item.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Size</p>
                <p className="text-gray-900 dark:text-white">{item.size}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Condition</p>
                <p className="text-gray-900 dark:text-white capitalize">{item.condition}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Uploader Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Listed by
              </h3>
              <div className="flex items-center space-x-4">
                {item.uploaderAvatar && (
                  <img
                    src={item.uploaderAvatar}
                    alt={item.uploaderName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.uploaderName}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Listed {new Date(item.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {item.isAvailable && user && user.id !== item.uploaderId && (
              <div className="space-y-3">
                <button
                  onClick={handleSwapRequest}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowUpDown className="h-5 w-5" />
                  <span>Request Swap</span>
                </button>
                
                <button
                  onClick={() => {
                    setSwapType('points');
                    handleSwapRequest();
                  }}
                  className="w-full border-2 border-green-600 text-green-600 dark:text-green-400 py-3 px-6 rounded-lg font-semibold hover:bg-green-600 hover:text-white dark:hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <Star className="h-5 w-5" />
                  <span>Redeem with Points ({item.pointValue})</span>
                </button>
              </div>
            )}

            {!user && (
              <button
                onClick={() => onNavigate('auth')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Sign In to Request Swap
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {swapType === 'swap' ? 'Request Item Swap' : 'Redeem with Points'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Swap Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="swap"
                      checked={swapType === 'swap'}
                      onChange={(e) => setSwapType(e.target.value as 'swap' | 'points')}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Item Swap</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="points"
                      checked={swapType === 'points'}
                      onChange={(e) => setSwapType(e.target.value as 'swap' | 'points')}
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Points ({item.pointValue})</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add a message to the item owner..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={submitSwapRequest}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;