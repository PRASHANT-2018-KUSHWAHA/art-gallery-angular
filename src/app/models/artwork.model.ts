export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  image?: string; // For compatibility with new components
  thumbnailUrl: string;
  images?: string[]; // For multiple images
  category: ArtworkCategory;
  tags: string[];
  price?: number;
  isAvailable: boolean;
  featured: boolean;
  location?: string; // Gallery location
}

export interface ArtworkCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface GalleryFilter {
  category?: string;
  searchTerm?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  yearRange?: {
    min: number;
    max: number;
  };
  featured?: boolean;
}
