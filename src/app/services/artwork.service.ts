import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Artwork, ArtworkCategory, GalleryFilter } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private artworksSubject = new BehaviorSubject<Artwork[]>([]);
  private categoriesSubject = new BehaviorSubject<ArtworkCategory[]>([]);
  private filterSubject = new BehaviorSubject<GalleryFilter>({});
  private savedArtworksSubject = new BehaviorSubject<string[]>([]);

  public artworks$ = this.artworksSubject.asObservable();
  public categories$ = this.categoriesSubject.asObservable();
  public filter$ = this.filterSubject.asObservable();
  public savedArtworks$ = this.savedArtworksSubject.asObservable();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Initialize categories
    const categories: ArtworkCategory[] = [
      { id: '1', name: 'Paintings', description: 'Oil, acrylic, and watercolor paintings', color: '#FF6B6B' },
      { id: '2', name: 'Sculptures', description: 'Three-dimensional artistic works', color: '#4ECDC4' },
      { id: '3', name: 'Photography', description: 'Digital and film photography', color: '#45B7D1' },
      { id: '4', name: 'Digital Art', description: 'Computer-generated and digital media', color: '#96CEB4' },
      { id: '5', name: 'Mixed Media', description: 'Combination of different artistic mediums', color: '#FECA57' }
    ];
    this.categoriesSubject.next(categories);

    // Initialize sample artworks
    const artworks: Artwork[] = [
      {
        id: '1',
        title: 'Sunset Dreams',
        artist: 'Maria Rodriguez',
        year: 2023,
        medium: 'Oil on Canvas',
        dimensions: '24" x 36"',
        description: 'A vibrant interpretation of a sunset over rolling hills, capturing the warmth and beauty of golden hour.',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'
        ],
        location: 'Main Gallery, Floor 1',
        category: categories[0],
        tags: ['landscape', 'sunset', 'nature', 'warm colors'],
        price: 2500,
        isAvailable: true,
        featured: true
      },
      {
        id: '2',
        title: 'Urban Geometry',
        artist: 'James Chen',
        year: 2023,
        medium: 'Acrylic on Canvas',
        dimensions: '30" x 30"',
        description: 'Abstract geometric patterns inspired by city architecture and modern design principles.',
        imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=200&fit=crop',
        category: categories[0],
        tags: ['abstract', 'geometric', 'urban', 'modern'],
        price: 1800,
        isAvailable: true,
        featured: false
      },
      {
        id: '3',
        title: 'Marble Contemplation',
        artist: 'Elena Volkov',
        year: 2022,
        medium: 'Carrara Marble',
        dimensions: '18" x 12" x 8"',
        description: 'A serene marble sculpture representing human contemplation and inner peace.',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
        category: categories[1],
        tags: ['sculpture', 'marble', 'contemplation', 'classical'],
        price: 4500,
        isAvailable: true,
        featured: true
      },
      {
        id: '4',
        title: 'Street Life',
        artist: 'David Kim',
        year: 2023,
        medium: 'Digital Photography',
        dimensions: '16" x 24"',
        description: 'Candid street photography capturing the essence of urban life and human connections.',
        imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop',
        category: categories[2],
        tags: ['street', 'urban', 'candid', 'black and white'],
        price: 800,
        isAvailable: true,
        featured: false
      },
      {
        id: '5',
        title: 'Digital Dreams',
        artist: 'Alex Thompson',
        year: 2023,
        medium: 'Digital Art',
        dimensions: '24" x 18"',
        description: 'A surreal digital composition exploring the intersection of technology and human emotion.',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
        category: categories[3],
        tags: ['digital', 'surreal', 'technology', 'futuristic'],
        price: 1200,
        isAvailable: true,
        featured: true
      },
      {
        id: '6',
        title: 'Nature\'s Symphony',
        artist: 'Sarah Johnson',
        year: 2022,
        medium: 'Mixed Media',
        dimensions: '20" x 28"',
        description: 'A collage combining natural materials with acrylic paint, celebrating the harmony of nature.',
        imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=200&fit=crop',
        category: categories[4],
        tags: ['nature', 'mixed media', 'collage', 'organic'],
        price: 1600,
        isAvailable: true,
        featured: false
      }
    ];
    this.artworksSubject.next(artworks);
  }

  getArtworks(): Observable<Artwork[]> {
    return this.artworks$;
  }

  getCategories(): Observable<ArtworkCategory[]> {
    return this.categories$;
  }


  getFeaturedArtworks(): Observable<Artwork[]> {
    const artworks = this.artworksSubject.value;
    const featured = artworks.filter(a => a.featured);
    return of(featured);
  }

  updateFilter(filter: GalleryFilter): void {
    this.filterSubject.next(filter);
  }

  getFilteredArtworks(): Observable<Artwork[]> {
    return new Observable(observer => {
      this.artworks$.subscribe(artworks => {
        this.filter$.subscribe(filter => {
          let filtered = [...artworks];

          if (filter.category) {
            filtered = filtered.filter(artwork => artwork.category.id === filter.category);
          }

          if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            filtered = filtered.filter(artwork =>
              artwork.title.toLowerCase().includes(term) ||
              artwork.artist.toLowerCase().includes(term) ||
              artwork.tags.some(tag => tag.toLowerCase().includes(term))
            );
          }

          if (filter.priceRange) {
            filtered = filtered.filter(artwork =>
              artwork.price && artwork.price >= filter.priceRange!.min && artwork.price <= filter.priceRange!.max
            );
          }

          if (filter.yearRange) {
            filtered = filtered.filter(artwork =>
              artwork.year >= filter.yearRange!.min && artwork.year <= filter.yearRange!.max
            );
          }

          if (filter.featured !== undefined) {
            filtered = filtered.filter(artwork => artwork.featured === filter.featured);
          }

          observer.next(filtered);
        });
      });
    });
  }

  // New methods for artwork details and saved functionality
  getArtworkById(id: string): Observable<Artwork | null> {
    return new Observable(observer => {
      this.artworks$.subscribe(artworks => {
        const artwork = artworks.find(a => a.id === id) || null;
        observer.next(artwork);
      });
    });
  }

  getRelatedArtworks(artworkId: string, limit: number = 4): Observable<Artwork[]> {
    return new Observable(observer => {
      this.artworks$.subscribe(artworks => {
        const currentArtwork = artworks.find(a => a.id === artworkId);
        if (!currentArtwork) {
          observer.next([]);
          return;
        }

        // Get artworks from the same category, excluding the current one
        const related = artworks
          .filter(a => a.id !== artworkId && a.category?.id === currentArtwork.category?.id)
          .slice(0, limit);

        // If not enough from same category, fill with random artworks
        if (related.length < limit) {
          const remaining = artworks
            .filter(a => a.id !== artworkId && !related.some(r => r.id === a.id))
            .slice(0, limit - related.length);
          related.push(...remaining);
        }

        observer.next(related);
      });
    });
  }

  getSavedArtworks(): Observable<Artwork[]> {
    return new Observable(observer => {
      this.savedArtworks$.subscribe(savedIds => {
        this.artworks$.subscribe(artworks => {
          const savedArtworks = artworks.filter(artwork => savedIds.includes(artwork.id));
          observer.next(savedArtworks);
        });
      });
    });
  }

  saveArtwork(artworkId: string): void {
    const currentSaved = this.savedArtworksSubject.value;
    if (!currentSaved.includes(artworkId)) {
      this.savedArtworksSubject.next([...currentSaved, artworkId]);
    }
  }

  unsaveArtwork(artworkId: string): void {
    const currentSaved = this.savedArtworksSubject.value;
    this.savedArtworksSubject.next(currentSaved.filter(id => id !== artworkId));
  }

  isArtworkSaved(artworkId: string): boolean {
    return this.savedArtworksSubject.value.includes(artworkId);
  }
}
