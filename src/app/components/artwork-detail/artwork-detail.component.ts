import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="artwork-detail-container" *ngIf="artwork" [@fadeIn]>
      <!-- Back Button -->
      <div class="back-button-container">
        <button class="back-button" (click)="goBack()">
          <span class="back-icon">←</span>
          Back to Gallery
        </button>
      </div>

      <div class="artwork-detail-content">
        <!-- Image Section -->
        <div class="image-section" [@slideInLeft]>
          <div class="image-container">
            <img [src]="artwork.imageUrl" 
                 [alt]="artwork.title"
                 class="artwork-image"
                 [@imageZoom]="isImageLoaded ? 'loaded' : 'loading'"
                 (load)="onImageLoad()">
            
            <div class="image-overlay" *ngIf="!isImageLoaded">
              <div class="loading-spinner"></div>
            </div>
          </div>
          
          <div class="image-actions">
            <button class="action-button" (click)="toggleFavorite()">
              <span class="action-icon">{{ isFavorite ? '❤️' : '🤍' }}</span>
              {{ isFavorite ? 'Saved' : 'Save' }}
            </button>
            <button class="action-button" (click)="shareArtwork()">
              <span class="action-icon">📤</span>
              Share
            </button>
            <button class="action-button" (click)="downloadImage()">
              <span class="action-icon">⬇️</span>
              Download
            </button>
          </div>
        </div>

        <!-- Details Section -->
        <div class="details-section" [@slideInRight]>
          <div class="artwork-header">
            <h1 class="artwork-title">{{ artwork.title }}</h1>
            <p class="artwork-artist">by {{ artwork.artist }}</p>
            <div class="artwork-year">{{ artwork.year }}</div>
          </div>

          <div class="artwork-info">
            <div class="info-item">
              <span class="info-label">Medium:</span>
              <span class="info-value">{{ artwork.medium }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Dimensions:</span>
              <span class="info-value">{{ artwork.dimensions }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Category:</span>
              <span class="info-value category-tag" [style.background-color]="artwork.category.color + '20'"
                    [style.color]="artwork.category.color">
                {{ artwork.category.name }}
              </span>
            </div>
          </div>

          <div class="artwork-description">
            <h3>Description</h3>
            <p>{{ artwork.description }}</p>
          </div>

          <div class="artwork-tags">
            <h4>Tags</h4>
            <div class="tags-container">
              <span *ngFor="let tag of artwork.tags" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="artwork-purchase" *ngIf="artwork.price">
            <div class="price-section">
              <span class="price-label">Price:</span>
              <span class="price-value">{{ artwork.price | currency:'INR':'symbol':'1.0-0' }}</span>
            </div>
            <div class="purchase-actions">
              <button class="purchase-button primary" (click)="contactArtist()">
                Contact Artist
              </button>
              <button class="purchase-button secondary" (click)="addToWishlist()">
                Add to Wishlist
              </button>
            </div>
          </div>

          <div class="artwork-availability" [class.available]="artwork.isAvailable">
            <span class="availability-icon">{{ artwork.isAvailable ? '✓' : '✗' }}</span>
            <span class="availability-text">
              {{ artwork.isAvailable ? 'Available' : 'Not Available' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Related Artworks -->
      <div class="related-section" *ngIf="relatedArtworks.length > 0" [@fadeInUp]>
        <h2 class="section-title">Related Artworks</h2>
        <div class="related-grid">
          <div *ngFor="let related of relatedArtworks" 
               class="related-item"
               [@staggerFadeIn]
               (click)="viewArtwork(related.id)">
            <img [src]="related.thumbnailUrl" 
                 [alt]="related.title"
                 class="related-image">
            <div class="related-info">
              <h4 class="related-title">{{ related.title }}</h4>
              <p class="related-artist">{{ related.artist }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loading-container" *ngIf="!artwork && !isLoading">
      <div class="error-message">
        <h2>Artwork Not Found</h2>
        <p>The artwork you're looking for doesn't exist or has been removed.</p>
        <button class="back-button" (click)="goBack()">
          Back to Gallery
        </button>
      </div>
    </div>
  `,
  styles: [`
    .artwork-detail-container {
      min-height: 100vh;
      background: #f8fafc;
      padding: 2rem;
    }
    
    .back-button-container {
      max-width: 1200px;
      margin: 0 auto 2rem;
    }
    
    .back-button {
      background: white;
      border: 2px solid #e5e7eb;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      color: #374151;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .back-button:hover {
      border-color: #6366f1;
      color: #6366f1;
      transform: translateX(-2px);
    }
    
    .back-icon {
      font-size: 1.2rem;
    }
    
    .artwork-detail-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }
    
    .image-section {
      position: sticky;
      top: 2rem;
    }
    
    .image-container {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      background: white;
    }
    
    .artwork-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .artwork-image:hover {
      transform: scale(1.02);
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .image-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .action-button {
      flex: 1;
      background: white;
      border: 2px solid #e5e7eb;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      color: #374151;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .action-button:hover {
      border-color: #6366f1;
      color: #6366f1;
    }
    
    .action-icon {
      font-size: 1.1rem;
    }
    
    .details-section {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .artwork-header {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .artwork-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }
    
    .artwork-artist {
      font-size: 1.25rem;
      color: #718096;
      margin-bottom: 0.5rem;
    }
    
    .artwork-year {
      font-size: 1.1rem;
      color: #4a5568;
      font-weight: 600;
    }
    
    .artwork-info {
      margin-bottom: 2rem;
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f5f9;
    }
    
    .info-label {
      font-weight: 600;
      color: #374151;
    }
    
    .info-value {
      color: #4a5568;
    }
    
    .category-tag {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .artwork-description {
      margin-bottom: 2rem;
    }
    
    .artwork-description h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
    }
    
    .artwork-description p {
      color: #4a5568;
      line-height: 1.6;
    }
    
    .artwork-tags {
      margin-bottom: 2rem;
    }
    
    .artwork-tags h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tag {
      background: #f1f5f9;
      color: #4a5568;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    
    .artwork-purchase {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }
    
    .price-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .price-label {
      font-weight: 600;
      color: #374151;
    }
    
    .price-value {
      font-size: 2rem;
      font-weight: 700;
      color: #6366f1;
    }
    
    .purchase-actions {
      display: flex;
      gap: 1rem;
    }
    
    .purchase-button {
      flex: 1;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }
    
    .purchase-button.primary {
      background: #6366f1;
      color: white;
    }
    
    .purchase-button.primary:hover {
      background: #4f46e5;
      transform: translateY(-1px);
    }
    
    .purchase-button.secondary {
      background: white;
      color: #6366f1;
      border: 2px solid #6366f1;
    }
    
    .purchase-button.secondary:hover {
      background: #6366f1;
      color: white;
    }
    
    .artwork-availability {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      background: #fef2f2;
      color: #dc2626;
    }
    
    .artwork-availability.available {
      background: #f0fdf4;
      color: #16a34a;
    }
    
    .availability-icon {
      font-weight: bold;
    }
    
    .related-section {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    
    .related-item {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .related-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .related-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    
    .related-info {
      padding: 1rem;
    }
    
    .related-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 0.25rem;
    }
    
    .related-artist {
      font-size: 0.8rem;
      color: #718096;
      margin: 0;
    }
    
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
    }
    
    .error-message {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .error-message h2 {
      color: #dc2626;
      margin-bottom: 1rem;
    }
    
    .error-message p {
      color: #6b7280;
      margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
      .artwork-detail-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .image-section {
        position: static;
      }
      
      .artwork-title {
        font-size: 2rem;
      }
      
      .purchase-actions {
        flex-direction: column;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('0.6s ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.6s ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('imageZoom', [
      state('loading', style({ opacity: 0.7 })),
      state('loaded', style({ opacity: 1 })),
      transition('loading => loaded', animate('0.5s ease'))
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFadeIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ArtworkDetailComponent implements OnInit, OnDestroy {
  artwork: Artwork | undefined;
  relatedArtworks: Artwork[] = [];
  isFavorite = false;
  isImageLoaded = false;
  isLoading = true;
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const artworkId = params['id'];
        if (artworkId) {
          this.loadArtwork(artworkId);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadArtwork(id: string): void {
    this.artworkService.getArtworkById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(artwork => {
        this.artwork = artwork || undefined;
        this.isLoading = false;
        if (artwork) {
          this.loadRelatedArtworks(artwork);
        }
      });
  }

  private loadRelatedArtworks(artwork: Artwork): void {
    this.artworkService.getArtworks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(artworks => {
        this.relatedArtworks = artworks
          .filter(a => a.id !== artwork.id && a.category.id === artwork.category.id)
          .slice(0, 4);
      });
  }

  onImageLoad(): void {
    this.isImageLoaded = true;
  }

  goBack(): void {
    window.history.back();
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    // Here you would typically call a service to save the favorite state
  }

  shareArtwork(): void {
    if (navigator.share && this.artwork) {
      navigator.share({
        title: this.artwork.title,
        text: `Check out this amazing artwork: ${this.artwork.title} by ${this.artwork.artist}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  downloadImage(): void {
    if (this.artwork) {
      const link = document.createElement('a');
      link.href = this.artwork.imageUrl;
      link.download = `${this.artwork.title.replace(/\s+/g, '_')}.jpg`;
      link.click();
    }
  }

  contactArtist(): void {
    // Here you would implement contact functionality
    alert('Contact artist functionality would be implemented here');
  }

  addToWishlist(): void {
    // Here you would implement wishlist functionality
    alert('Added to wishlist!');
  }

  viewArtwork(id: string): void {
    // Navigate to the artwork detail page
    window.location.href = `/artwork-detail/${id}`;
  }
}
