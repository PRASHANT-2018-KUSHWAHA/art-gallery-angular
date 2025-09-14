import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-artwork-view-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="artwork-detail-container" *ngIf="artwork" [@fadeInUp]>
      <!-- Back Button -->
      <div class="back-section">
        <button class="back-btn" (click)="goBack()">
          <span class="back-icon">←</span>
          Back to Gallery
        </button>
      </div>

      <!-- Main Content -->
      <div class="detail-content">
        <!-- Image Section -->
        <div class="image-section">
          <div class="main-image-container">
            <img [src]="currentImage || artwork.image || artwork.imageUrl" [alt]="artwork.title" class="main-image">
            <div class="image-overlay">
              <button class="zoom-btn" (click)="openZoom()">
                <span class="zoom-icon">🔍</span>
                Zoom
              </button>
              <button class="save-btn" (click)="toggleSave()" [class.saved]="isSaved">
                <span class="save-icon">{{ isSaved ? '❤️' : '🤍' }}</span>
                {{ isSaved ? 'Saved' : 'Save' }}
              </button>
            </div>
          </div>
          
          <!-- Thumbnail Gallery -->
          <div class="thumbnail-gallery" *ngIf="artwork.images && artwork.images.length > 1">
            <div 
              *ngFor="let image of artwork.images; let i = index"
              class="thumbnail"
              [class.active]="i === selectedImageIndex"
              (click)="selectImage(i)">
              <img [src]="image" [alt]="artwork.title + ' ' + (i + 1)">
            </div>
          </div>
          <!-- Fallback for single image -->
          <div class="thumbnail-gallery" *ngIf="!artwork.images || artwork.images.length <= 1">
            <div class="thumbnail active">
              <img [src]="artwork.image || artwork.imageUrl" [alt]="artwork.title">
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="info-section">
          <div class="artwork-header">
            <h1 class="artwork-title">{{ artwork.title }}</h1>
            <div class="artwork-meta">
              <span class="artist-name">by {{ artwork.artist }}</span>
              <span class="artwork-year">{{ artwork.year }}</span>
            </div>
          </div>

          <div class="artwork-details">
            <div class="detail-row">
              <span class="detail-label">Category:</span>
              <span class="detail-value">{{ artwork.category.name || 'N/A' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Medium:</span>
              <span class="detail-value">{{ artwork.medium || 'N/A' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Dimensions:</span>
              <span class="detail-value">{{ artwork.dimensions || 'N/A' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-value">{{ artwork.location || 'N/A' }}</span>
            </div>
          </div>

          <div class="artwork-description">
            <h3>Description</h3>
            <p>{{ artwork.description || 'No description available.' }}</p>
          </div>

          <div class="artwork-tags" *ngIf="artwork.tags && artwork.tags.length > 0">
            <h3>Tags</h3>
            <div class="tags-container">
              <span *ngFor="let tag of artwork.tags" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="purchase-section">
            <div class="price-section">
              <span class="price-label">Price:</span>
              <span class="price-value" *ngIf="artwork.price">{{ artwork.price | number }}</span>
              <span class="price-value" *ngIf="!artwork.price">Contact for Price</span>
            </div>
            
            <div class="action-buttons">
              <button class="contact-btn primary" (click)="contactArtist()">
                <span class="btn-icon">📧</span>
                Contact Artist
              </button>
              <button class="share-btn" (click)="shareArtwork()">
                <span class="btn-icon">📤</span>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Artworks -->
      <div class="related-section" *ngIf="relatedArtworks.length > 0">
        <h2 class="section-title">Related Artworks</h2>
        <div class="related-grid">
          <div 
            *ngFor="let relatedArtwork of relatedArtworks"
            class="related-card"
            (click)="viewArtwork(relatedArtwork.id)">
            <img [src]="relatedArtwork.image || relatedArtwork.imageUrl" [alt]="relatedArtwork.title" class="related-image">
            <div class="related-info">
              <h4 class="related-title">{{ relatedArtwork.title }}</h4>
              <p class="related-artist">{{ relatedArtwork.artist }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="loading-container" *ngIf="!artwork">
      <div class="loading-spinner"></div>
      <p>Loading artwork details...</p>
    </div>
  `,
  styles: [`
    .artwork-detail-container {
      min-height: 100vh;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .back-section {
      margin-bottom: 2rem;
    }
    
    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: 2px solid #e5e7eb;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      color: #374151;
    }
    
    .back-btn:hover {
      border-color: #6366f1;
      color: #6366f1;
    }
    
    .back-icon {
      font-size: 1.2rem;
    }
    
    .detail-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }
    
    .image-section {
      position: sticky;
      top: 2rem;
    }
    
    .main-image-container {
      position: relative;
      margin-bottom: 1rem;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .main-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .main-image-container:hover .main-image {
      transform: scale(1.02);
    }
    
    .image-overlay {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .main-image-container:hover .image-overlay {
      opacity: 1;
    }
    
    .zoom-btn, .save-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: all 0.3s ease;
    }
    
    .zoom-btn:hover, .save-btn:hover {
      background: white;
      transform: translateY(-2px);
    }
    
    .save-btn.saved {
      background: #ef4444;
      color: white;
    }
    
    .thumbnail-gallery {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding: 0.5rem 0;
    }
    
    .thumbnail {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }
    
    .thumbnail:hover, .thumbnail.active {
      border-color: #6366f1;
    }
    
    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .info-section {
      padding: 1rem 0;
    }
    
    .artwork-header {
      margin-bottom: 2rem;
    }
    
    .artwork-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    .artwork-meta {
      display: flex;
      gap: 2rem;
      color: #6b7280;
      font-size: 1.1rem;
    }
    
    .artist-name {
      font-weight: 600;
      color: #6366f1;
    }
    
    .artwork-details {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }
    
    .detail-row:last-child {
      margin-bottom: 0;
    }
    
    .detail-label {
      font-weight: 600;
      color: #374151;
    }
    
    .detail-value {
      color: #6b7280;
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
    
    .artwork-tags h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .tag {
      background: #e5e7eb;
      color: #374151;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .purchase-section {
      background: white;
      border: 2px solid #e5e7eb;
      padding: 2rem;
      border-radius: 12px;
    }
    
    .price-section {
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .price-label {
      display: block;
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    
    .price-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
    }
    
    .contact-btn, .share-btn {
      flex: 1;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .contact-btn.primary {
      background: #6366f1;
      color: white;
      border: none;
    }
    
    .contact-btn.primary:hover {
      background: #4f46e5;
      transform: translateY(-2px);
    }
    
    .share-btn {
      background: white;
      color: #6366f1;
      border: 2px solid #6366f1;
    }
    
    .share-btn:hover {
      background: #6366f1;
      color: white;
    }
    
    .related-section {
      margin-top: 4rem;
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
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .related-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .related-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    .related-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .related-info {
      padding: 1rem;
    }
    
    .related-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .related-artist {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      gap: 1rem;
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
    
    @media (max-width: 768px) {
      .detail-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .artwork-title {
        font-size: 2rem;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .related-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ArtworkViewDetailComponent implements OnInit {
  artwork: Artwork | null = null;
  relatedArtworks: Artwork[] = [];
  selectedImageIndex = 0;
  isSaved = false;
  currentImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artworkService: ArtworkService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const artworkId = params['id'];
      if (artworkId) {
        this.loadArtwork(artworkId);
      }
    });
  }

  loadArtwork(id: string) {
    this.artworkService.getArtworkById(id).subscribe(artwork => {
      this.artwork = artwork || null;
      if (this.artwork) {
        this.currentImage = this.artwork.image || this.artwork.imageUrl;
        this.loadRelatedArtworks();
        this.checkIfSaved();
      }
    });
  }

  loadRelatedArtworks() {
    if (this.artwork) {
      this.artworkService.getRelatedArtworks(this.artwork.id, 4).subscribe(artworks => {
        this.relatedArtworks = artworks;
      });
    }
  }

  checkIfSaved() {
    if (this.artwork) {
      this.isSaved = this.artworkService.isArtworkSaved(this.artwork.id);
    }
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
    if (this.artwork && this.artwork.images) {
      this.currentImage = this.artwork.images[index];
    }
  }

  toggleSave() {
    if (this.artwork) {
      this.isSaved = !this.isSaved;
      if (this.isSaved) {
        this.artworkService.saveArtwork(this.artwork.id);
      } else {
        this.artworkService.unsaveArtwork(this.artwork.id);
      }
    }
  }

  openZoom() {
    // Implement zoom functionality
    console.log('Open zoom for artwork:', this.artwork?.title);
  }

  contactArtist() {
    // Implement contact artist functionality
    console.log('Contact artist for artwork:', this.artwork?.title);
  }

  shareArtwork() {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: this.artwork?.title,
        text: `Check out this artwork: ${this.artwork?.title} by ${this.artwork?.artist}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }

  viewArtwork(id: string) {
    this.router.navigate(['/artwork', id]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
