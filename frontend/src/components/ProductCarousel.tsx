import React from 'react';

interface Product {
  id: string;
  title: string;
  images: string[];
  pointValue: number;
  isAvailable: boolean;
  category: string;
}

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (id: string) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onProductClick }) => {
  return (
    <div className="flex space-x-6 overflow-x-auto pb-2">
      {products.map(product => (
        <div
          key={product.id}
          className="min-w-[220px] bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition flex-shrink-0"
          onClick={() => onProductClick(product.id)}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.pointValue} Points</p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium mt-2 ${
            product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {product.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;