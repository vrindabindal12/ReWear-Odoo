import { ClothingItem, SwapRequest } from '../types';

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket from the 90s. Perfect condition with minimal wear. Great for layering and adding a vintage touch to any outfit.',
    category: 'outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'good',
    tags: ['vintage', 'denim', 'casual', '90s'],
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '2',
    uploaderName: 'Emma Wilson',
    uploaderAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    pointValue: 45,
    isAvailable: true,
    uploadDate: '2024-01-10',
    location: 'Los Angeles, CA'
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral midi dress perfect for summer occasions. Lightweight fabric with a flattering A-line silhouette.',
    category: 'dresses',
    type: 'Midi Dress',
    size: 'S',
    condition: 'like-new',
    tags: ['floral', 'summer', 'midi', 'feminine'],
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '3',
    uploaderName: 'Alex Chen',
    uploaderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    pointValue: 35,
    isAvailable: true,
    uploadDate: '2024-01-08',
    location: 'New York, NY'
  },
  {
    id: '3',
    title: 'Designer Leather Boots',
    description: 'High-quality leather ankle boots from a premium brand. Barely worn, excellent condition. Perfect for fall and winter styling.',
    category: 'shoes',
    type: 'Ankle Boots',
    size: '8',
    condition: 'like-new',
    tags: ['leather', 'designer', 'boots', 'fall'],
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '4',
    uploaderName: 'Maria Garcia',
    uploaderAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    pointValue: 65,
    isAvailable: true,
    uploadDate: '2024-01-05',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    title: 'Cozy Knit Sweater',
    description: 'Soft wool blend sweater in cream color. Perfect for layering during colder months. Oversized fit for maximum comfort.',
    category: 'tops',
    type: 'Sweater',
    size: 'L',
    condition: 'good',
    tags: ['knit', 'cozy', 'wool', 'oversized'],
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    uploaderId: '5',
    uploaderName: 'David Kim',
    pointValue: 30,
    isAvailable: true,
    uploadDate: '2024-01-03',
    location: 'Seattle, WA'
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterId: '2',
    requesterName: 'Emma Wilson',
    itemId: '1',
    itemTitle: 'Vintage Denim Jacket',
    offeredItemId: '2',
    offeredItemTitle: 'Floral Summer Dress',
    type: 'swap',
    status: 'pending',
    createdDate: '2024-01-12',
    message: 'Hi! I love your denim jacket. Would you be interested in swapping for my floral dress?'
  },
  {
    id: '2',
    requesterId: '3',
    requesterName: 'Alex Chen',
    itemId: '3',
    itemTitle: 'Designer Leather Boots',
    type: 'points',
    status: 'completed',
    createdDate: '2024-01-10'
  }
];