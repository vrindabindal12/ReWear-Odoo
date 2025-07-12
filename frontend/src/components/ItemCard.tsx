import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { ClothingItem } from '../types';

interface ItemCardProps {
  item: ClothingItem;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'like-new': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'good': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'fair': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transform hover:-translate-y-2"
    >
      <div className="relative">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getConditionColor(item.condition)}`}>
            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
          </span>
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Not Available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1 text-lg">
            {item.title}
          </h3>
          <span className="text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
            {item.pointValue} pts
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-1 rounded-full font-medium">
            Size {item.size}
          </span>
          <span className="capitalize font-medium">{item.category}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {item.uploaderAvatar && (
              <img
                src={item.uploaderAvatar}
                alt={item.uploaderName}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-green-100 dark:ring-green-900/20"
              />
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {item.uploaderName}
            </span>
          </div>
          
          {item.location && (
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="h-3 w-3" />
              <span>{item.location.split(',')[0]}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3" />
          <span>Listed {new Date(item.uploadDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;