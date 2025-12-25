import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="saved-container" [@fadeInUp]>
      <!-- Hero Section -->
      <section class="saved-hero">
        <div class="hero-content">
          <h1 class="hero-title">Your Saved Artworks</h1>
          <p class="hero-subtitle">Your personal collection of favorite artworks</p>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-group">
            <label class="filter-label">Search Saved Items</label>
            <input 
              type="text" 
              [(ngModel)]="searchTerm"
              (input)="filterSavedArtworks()"
              placeholder="Search by title, artist, or category..."
              class="search-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Sort By</label>
            <select 
              [(ngModel)]="sortBy"
              (change)="sortSavedArtworks()"
              class="filter-select">
              <option value="dateAdded">Date Added</option>
              <option value="title">Title A-Z</option>
              <option value="artist">Artist A-Z</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Saved Artworks Grid -->
      <section class="saved-section">
        <div class="saved-header">
          <h2 class="section-title">Saved Collection</h2>
          <div class="saved-stats">
            <span class="stats-item">
              <span class="stats-number">{{ savedArtworks.length }}</span>
              <span class="stats-label">Artworks</span>
            </span>
            <span class="stats-item">
              <span class="stats-number">{{ totalValue | currency:'INR':'symbol':'1.0-0' }}</span>
              <span class="stats-label">Total Value</span>
            </span>
          </div>
        </div>
        
        <div class="saved-grid" [@staggerFadeIn] *ngIf="filteredArtworks.length > 0">
          <div 
            *ngFor="let artwork of filteredArtworks; trackBy: trackByArtworkId"
            class="saved-card"
            [@fadeInUp]>
            <div class="card-image-container">
              <img [src]="artwork.image" [alt]="artwork.title" class="card-image">
              <div class="card-overlay">
                <button class="view-btn" [routerLink]="['/artwork', artwork.id]">
                  <span class="btn-icon">👁️</span>
                  View Details
                </button>
                <button class="quick-view-btn" (click)="openQuickView(artwork)">
                  <span class="btn-icon">⚡</span>
                  Quick View
                </button>
                <button class="remove-btn" (click)="removeFromSaved(artwork.id)">
                  <span class="btn-icon">🗑️</span>
                  Remove
                </button>
              </div>
              <div class="saved-badge">
                <span class="badge-icon">❤️</span>
                Saved
              </div>
            </div>
            
            <div class="card-content">
              <h3 class="artwork-title">{{ artwork.title }}</h3>
              <p class="artwork-artist">{{ artwork.artist }}</p>
              <p class="artwork-year">{{ artwork.year }}</p>
              
              <div class="artwork-meta">
                <span class="category-tag">{{ artwork?.category?.name || 'N/A' }}</span>
                <span class="price" *ngIf="artwork.price">{{ artwork.price | currency:'INR':'symbol':'1.0-0' }}</span>
                <span class="price" *ngIf="!artwork.price">Contact for Price</span>
              </div> 
              
              <div class="saved-date">
                <span class="date-icon">📅</span>
                <span class="date-text">Saved {{ getSavedDate(artwork.id) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div *ngIf="savedArtworks.length === 0" class="empty-state">
          <div class="empty-content">
            <span class="empty-icon">💔</span>
            <h3>No Saved Artworks</h3>
            <p>Start exploring our gallery and save your favorite artworks to see them here.</p>
            <button class="explore-btn" routerLink="/">
              <span class="btn-icon">🎨</span>
              Explore Gallery
            </button>
          </div>
        </div>
        
        <!-- No Results -->
        <div *ngIf="savedArtworks.length > 0 && filteredArtworks.length === 0" class="no-results">
          <div class="no-results-content">
            <span class="no-results-icon">🔍</span>
            <h3>No Results Found</h3>
            <p>Try adjusting your search criteria</p>
            <button class="clear-search-btn" (click)="clearSearch()">Clear Search</button>
          </div>
        </div>
      </section>

      <!-- Bulk Actions -->
      <section class="bulk-actions" *ngIf="savedArtworks.length > 0">
        <div class="bulk-actions-container">
          <div class="bulk-controls">
            <label class="select-all-label">
              <input 
                type="checkbox" 
                [(ngModel)]="selectAll"
                (change)="toggleSelectAll()"
                class="select-all-checkbox">
              Select All
            </label>
            <span class="selected-count">{{ selectedArtworks.length }} selected</span>
          </div>
          
          <div class="bulk-buttons" *ngIf="selectedArtworks.length > 0">
            <button class="bulk-btn remove" (click)="removeSelected()">
              <span class="btn-icon">🗑️</span>
              Remove Selected
            </button>
            <button class="bulk-btn share" (click)="shareSelected()">
              <span class="btn-icon">📤</span>
              Share Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .saved-container {
      min-height: 100vh;
    }
    
    .saved-hero {
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
    
    .saved-section {
      padding: 4rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .saved-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
    }
    
    .saved-stats {
      display: flex;
      gap: 2rem;
    }
    
    .stats-item {
      text-align: center;
    }
    
    .stats-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: #6366f1;
    }
    
    .stats-label {
      font-size: 0.9rem;
      color: #6b7280;
    }
    
    .saved-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .saved-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }
    
    .saved-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .card-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    
    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .saved-card:hover .card-image {
      transform: scale(1.05);
    }
    
    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .saved-card:hover .card-overlay {
      opacity: 1;
    }
    
    .view-btn, .quick-view-btn, .remove-btn {
      background: white;
      color: #374151;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.9rem;
    }
    
    .view-btn:hover {
      background: #6366f1;
      color: white;
    }
    
    .quick-view-btn:hover {
      background: #10b981;
      color: white;
    }
    
    .remove-btn:hover {
      background: #ef4444;
      color: white;
    }
    
    .saved-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #ef4444;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .artwork-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .artwork-artist {
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .artwork-year {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .artwork-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .category-tag {
      background: #f3f4f6;
      color: #374151;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .price {
      font-weight: 700;
      color: #1a202c;
    }
    
    .saved-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .empty-state, .no-results {
      text-align: center;
      padding: 4rem 2rem;
    }
    
    .empty-content, .no-results-content {
      max-width: 400px;
      margin: 0 auto;
    }
    
    .empty-icon, .no-results-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }
    
    .empty-content h3, .no-results h3 {
      font-size: 1.5rem;
      color: #4a5568;
      margin-bottom: 1rem;
    }
    
    .empty-content p, .no-results p {
      color: #718096;
      margin-bottom: 2rem;
    }
    
    .explore-btn, .clear-search-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 auto;
    }
    
    .explore-btn:hover, .clear-search-btn:hover {
      background: #4f46e5;
    }
    
    .bulk-actions {
      padding: 2rem;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
    
    .bulk-actions-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .bulk-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .select-all-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      color: #374151;
    }
    
    .selected-count {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .bulk-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .bulk-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .bulk-btn.remove {
      background: #ef4444;
      color: white;
      border: none;
    }
    
    .bulk-btn.remove:hover {
      background: #dc2626;
    }
    
    .bulk-btn.share {
      background: #10b981;
      color: white;
      border: none;
    }
    
    .bulk-btn.share:hover {
      background: #059669;
    }
    
    @media (max-width: 768px) {
      .filter-container {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .saved-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .saved-grid {
        grid-template-columns: 1fr;
      }
      
      .bulk-actions-container {
        flex-direction: column;
        gap: 1rem;
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
export class SavedComponent implements OnInit {
  savedArtworks: Artwork[] = [];
  filteredArtworks: Artwork[] = [];
  selectedArtworks: Artwork[] = [];
  searchTerm = '';
  sortBy = 'dateAdded';
  selectAll = false;

  constructor(private artworkService: ArtworkService) {}

  ngOnInit() {
    this.loadSavedArtworks();
  }

  loadSavedArtworks() {
    this.artworkService.getSavedArtworks().subscribe(artworks => {
      this.savedArtworks = artworks;
      this.filteredArtworks = [...artworks];
    });
  }

  filterSavedArtworks() {
    this.filteredArtworks = this.savedArtworks.filter(artwork => {
      const matchesSearch = !this.searchTerm || 
        artwork.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        artwork.category?.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesSearch;
    });
    
    this.sortSavedArtworks();
  }

  sortSavedArtworks() {
    this.filteredArtworks.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'price':
          return (b.price || 0) - (a.price || 0);
        case 'dateAdded':
        default:
          return this.getSavedDate(b.id).localeCompare(this.getSavedDate(a.id));
      }
    });
  }

  getSavedDate(artworkId: string): string {
    // Mock implementation - in a real app, this would come from the service
    const dates = ['2 days ago', '1 week ago', '2 weeks ago', '1 month ago', '2 months ago'];
    return dates[Math.floor(Math.random() * dates.length)];
  }

  get totalValue(): number {
    return this.savedArtworks.reduce((total, artwork) => total + (artwork.price || 0), 0);
  }

  removeFromSaved(artworkId: string) {
    this.artworkService.unsaveArtwork(artworkId);
    this.loadSavedArtworks();
  }

  openQuickView(artwork: Artwork) {
    // Implement quick view functionality
    console.log('Open quick view for:', artwork.title);
  }

  toggleSelectAll() {
    if (this.selectAll) {
      this.selectedArtworks = [...this.filteredArtworks];
    } else {
      this.selectedArtworks = [];
    }
  }

  removeSelected() {
    this.selectedArtworks.forEach(artwork => {
      this.artworkService.unsaveArtwork(artwork.id);
    });
    this.selectedArtworks = [];
    this.selectAll = false;
    this.loadSavedArtworks();
  }

  shareSelected() {
    const artworkTitles = this.selectedArtworks.map(a => a.title).join(', ');
    const shareText = `Check out my saved art collection: ${artworkTitles}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Art Collection',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Collection details copied to clipboard!');
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterSavedArtworks();
  }

  trackByArtworkId(index: number, artwork: Artwork): string {
    return artwork.id;
  }
}
