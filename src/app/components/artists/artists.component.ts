import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface Artist {
  id: string;
  name: string;
  bio: string;
  specialty: string;
  location: string;
  image: string;
  artworks: number;
  joinedDate: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="artists-container" [@fadeInUp]>
      <!-- Hero Section -->
      <section class="artists-hero">
        <div class="hero-content">
          <h1 class="hero-title">Meet Our Artists</h1>
          <p class="hero-subtitle">Discover the talented creators behind our amazing collection of artworks</p>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-group">
            <label class="filter-label">Search Artists</label>
            <input 
              type="text" 
              [(ngModel)]="searchTerm"
              (input)="filterArtists()"
              placeholder="Search by name, specialty, or location..."
              class="search-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Specialty</label>
            <select 
              [(ngModel)]="selectedSpecialty"
              (change)="filterArtists()"
              class="filter-select">
              <option value="">All Specialties</option>
              <option *ngFor="let specialty of specialties" [value]="specialty">
                {{ specialty }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- Artists Grid -->
      <section class="artists-section">
        <div class="artists-header">
          <h2 class="section-title">Featured Artists</h2>
          <p class="section-subtitle">{{ filteredArtists.length }} artists found</p>
        </div>
        
        <div class="artists-grid" [@staggerFadeIn]>
          <div 
            *ngFor="let artist of filteredArtists; trackBy: trackByArtistId"
            class="artist-card"
            [@fadeInUp]>
            <div class="artist-image-container">
              <img [src]="artist.image" [alt]="artist.name" class="artist-image">
              <div class="artist-overlay">
                <div class="social-links">
                  <a *ngIf="artist.socialLinks.instagram" [href]="artist.socialLinks.instagram" target="_blank" class="social-link">Instagram</a>
                  <a *ngIf="artist.socialLinks.twitter" [href]="artist.socialLinks.twitter" target="_blank" class="social-link">Twitter</a>
                  <a *ngIf="artist.socialLinks.website" [href]="artist.socialLinks.website" target="_blank" class="social-link">Website</a>
                </div>
              </div>
            </div>
            
            <div class="artist-info">
              <h3 class="artist-name">{{ artist.name }}</h3>
              <p class="artist-specialty">{{ artist.specialty }}</p>
              <p class="artist-location">📍 {{ artist.location }}</p>
              <p class="artist-bio">{{ artist.bio }}</p>
              <div class="artist-stats">
                <span class="stat">
                  <strong>{{ artist.artworks }}</strong> artworks
                </span>
                <span class="stat">
                  Joined {{ artist.joinedDate }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div *ngIf="filteredArtists.length === 0" class="no-results">
          <div class="no-results-content">
            <span class="no-results-icon">🎨</span>
            <h3>No artists found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .artists-container {
      min-height: 100vh;
    }
    
    .artists-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 2rem 4rem;
      text-align: center;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .filter-section {
      padding: 2rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .filter-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
    }
    
    .filter-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .search-input, .filter-select {
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    .search-input:focus, .filter-select:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .artists-section {
      padding: 4rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .artists-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
    }
    
    .section-subtitle {
      color: #718096;
      font-size: 1.1rem;
    }
    
    .artists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .artist-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .artist-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .artist-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    
    .artist-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .artist-card:hover .artist-image {
      transform: scale(1.05);
    }
    
    .artist-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .artist-card:hover .artist-overlay {
      opacity: 1;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid white;
      border-radius: 6px;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: white;
      color: #6366f1;
    }
    
    .artist-info {
      padding: 1.5rem;
    }
    
    .artist-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .artist-specialty {
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .artist-location {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .artist-bio {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .artist-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .stat {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .no-results {
      text-align: center;
      padding: 4rem 2rem;
    }
    
    .no-results-content {
      max-width: 400px;
      margin: 0 auto;
    }
    
    .no-results-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }
    
    .no-results h3 {
      font-size: 1.5rem;
      color: #4a5568;
      margin-bottom: 1rem;
    }
    
    .no-results p {
      color: #718096;
    }
    
    @media (max-width: 768px) {
      .filter-container {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .artists-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFadeIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ArtistsComponent implements OnInit {
  artists: Artist[] = [];
  filteredArtists: Artist[] = [];
  searchTerm = '';
  selectedSpecialty = '';
  specialties: string[] = [];

  ngOnInit() {
    this.loadArtists();
  }

  loadArtists() {
    // Mock data - in a real app, this would come from a service
    this.artists = [
      {
        id: '1',
        name: 'Sarah Johnson',
        bio: 'Contemporary artist specializing in abstract paintings that explore the intersection of color and emotion.',
        specialty: 'Abstract Painting',
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        artworks: 24,
        joinedDate: '2022',
        socialLinks: {
          instagram: 'https://instagram.com/sarahjohnson',
          website: 'https://sarahjohnson.art'
        }
      },
      {
        id: '2',
        name: 'Michael Chen',
        bio: 'Digital artist and photographer creating stunning visual narratives through mixed media.',
        specialty: 'Digital Art',
        location: 'San Francisco, CA',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        artworks: 18,
        joinedDate: '2021',
        socialLinks: {
          instagram: 'https://instagram.com/michaelchen',
          twitter: 'https://twitter.com/michaelchen'
        }
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        bio: 'Sculptor working primarily with bronze and marble, creating pieces that celebrate the human form.',
        specialty: 'Sculpture',
        location: 'Barcelona, Spain',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        artworks: 12,
        joinedDate: '2023',
        socialLinks: {
          instagram: 'https://instagram.com/elenarodriguez',
          website: 'https://elenarodriguez.sculpture'
        }
      },
      {
        id: '4',
        name: 'David Kim',
        bio: 'Landscape photographer capturing the beauty of nature in its most raw and authentic form.',
        specialty: 'Photography',
        location: 'Seoul, South Korea',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        artworks: 31,
        joinedDate: '2020',
        socialLinks: {
          instagram: 'https://instagram.com/davidkim',
          website: 'https://davidkim.photography'
        }
      },
      {
        id: '5',
        name: 'Anna Petrov',
        bio: 'Watercolor artist known for delicate botanical illustrations and nature-inspired compositions.',
        specialty: 'Watercolor',
        location: 'Moscow, Russia',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        artworks: 19,
        joinedDate: '2022',
        socialLinks: {
          instagram: 'https://instagram.com/annapetrov',
          website: 'https://annapetrov.watercolor'
        }
      },
      {
        id: '6',
        name: 'James Wilson',
        bio: 'Street artist and muralist bringing vibrant colors and social commentary to urban spaces.',
        specialty: 'Street Art',
        location: 'London, UK',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        artworks: 27,
        joinedDate: '2021',
        socialLinks: {
          instagram: 'https://instagram.com/jameswilson',
          twitter: 'https://twitter.com/jameswilson'
        }
      }
    ];

    this.filteredArtists = [...this.artists];
    this.specialties = [...new Set(this.artists.map(artist => artist.specialty))];
  }

  filterArtists() {
    this.filteredArtists = this.artists.filter(artist => {
      const matchesSearch = !this.searchTerm || 
        artist.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        artist.specialty.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        artist.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesSpecialty = !this.selectedSpecialty || 
        artist.specialty === this.selectedSpecialty;
      
      return matchesSearch && matchesSpecialty;
    });
  }

  trackByArtistId(index: number, artist: Artist): string {
    return artist.id;
  }
}
