export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  joinedDate: string;
  location?: string;
  role?: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  type: string;
  size: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  pointValue: number;
  isAvailable: boolean;
  uploadDate: string;
  location?: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId?: string;
  offeredItemTitle?: string;
  type: 'swap' | 'points';
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdDate: string;
  message?: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}