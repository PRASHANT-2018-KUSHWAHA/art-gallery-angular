import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quick-view-overlay" [@fadeIn] (click)="close()" *ngIf="isOpen">
      <div class="quick-view-container" (click)="$event.stopPropagation()" [@slideInUp]>
        <!-- Close Button -->
        <button class="close-btn" (click)="close()">
          <span class="close-icon">×</span>
        </button>

        <!-- Content -->
        <div class="quick-view-content" *ngIf="artwork">
          <!-- Image Section -->
          <div class="image-section">
            <div class="main-image-container">
              <img [src]="currentImage || artwork.image || artwork.imageUrl" [alt]="artwork.title" class="main-image">
              <div class="image-actions">
                <button class="action-btn zoom" (click)="openFullView()">
                  <span class="btn-icon">🔍</span>
                  Full View
                </button>
                <button class="action-btn save" (click)="toggleSave()" [class.saved]="isSaved">
                  <span class="btn-icon">{{ isSaved ? '❤️' : '🤍' }}</span>
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
              <h2 class="artwork-title">{{ artwork.title }}</h2>
              <div class="artwork-meta">
                <span class="artist-name">{{ artwork.artist }}</span>
                <span class="artwork-year">{{ artwork.year }}</span>
              </div>
            </div>

            <div class="artwork-details">
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Category</span>
                  <span class="detail-value">{{ artwork.category.name || 'N/A' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Medium</span>
                  <span class="detail-value">{{ artwork.medium || 'N/A' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Dimensions</span>
                  <span class="detail-value">{{ artwork.dimensions || 'N/A' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Location</span>
                  <span class="detail-value">{{ artwork.location || 'N/A' }}</span>
                </div>
              </div>
            </div>

            <div class="artwork-description" *ngIf="artwork.description">
              <h3>Description</h3>
              <p>{{ artwork.description }}</p>
            </div>

            <div class="artwork-tags" *ngIf="artwork.tags && artwork.tags.length > 0">
              <h3>Tags</h3>
              <div class="tags-container">
                <span *ngFor="let tag of artwork.tags" class="tag">{{ tag }}</span>
              </div>
            </div>

            <div class="purchase-section">
              <div class="price-section">
                <span class="price-label">Price</span>
                <span class="price-value" *ngIf="artwork.price">{{ artwork.price | currency:'INR':'symbol':'1.0-0' }}</span>
                <span class="price-value" *ngIf="!artwork.price">Contact for Price</span>
              </div>
              
              <div class="action-buttons">
                <button class="btn primary" (click)="openFullDetails()">
                  <span class="btn-icon">👁️</span>
                  View Full Details
                </button>
                <button class="btn secondary" (click)="contactArtist()">
                  <span class="btn-icon">📧</span>
                  Contact Artist
                </button>
                <button class="btn outline" (click)="shareArtwork()">
                  <span class="btn-icon">📤</span>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quick-view-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 2rem;
    }
    
    .quick-view-container {
      background: white;
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    }
    
    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: all 0.3s ease;
    }
    
    .close-btn:hover {
      background: rgba(0, 0, 0, 0.8);
      transform: scale(1.1);
    }
    
    .close-icon {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .quick-view-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 500px;
    }
    
    .image-section {
      background: #f8fafc;
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }
    
    .main-image-container {
      position: relative;
      flex: 1;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 1rem;
    }
    
    .main-image {
      width: 100%;
      height: 100%;
      min-height: 300px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .main-image-container:hover .main-image {
      transform: scale(1.02);
    }
    
    .image-actions {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .main-image-container:hover .image-actions {
      opacity: 1;
    }
    
    .action-btn {
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
      font-size: 0.9rem;
    }
    
    .action-btn:hover {
      background: white;
      transform: translateY(-2px);
    }
    
    .action-btn.save.saved {
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
      width: 60px;
      height: 60px;
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
      padding: 2rem;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    
    .artwork-header {
      margin-bottom: 1.5rem;
    }
    
    .artwork-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    
    .artwork-meta {
      display: flex;
      gap: 1rem;
      color: #6b7280;
    }
    
    .artist-name {
      font-weight: 600;
      color: #6366f1;
    }
    
    .artwork-details {
      margin-bottom: 1.5rem;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .detail-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .detail-value {
      color: #374151;
      font-weight: 500;
    }
    
    .artwork-description {
      margin-bottom: 1.5rem;
    }
    
    .artwork-description h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .artwork-description p {
      color: #4a5568;
      line-height: 1.6;
      font-size: 0.9rem;
    }
    
    .artwork-tags {
      margin-bottom: 1.5rem;
    }
    
    .artwork-tags h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
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
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .purchase-section {
      margin-top: auto;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .price-section {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    
    .price-label {
      display: block;
      font-size: 0.8rem;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }
    
    .price-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
    }
    
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .btn {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .btn.primary {
      background: #6366f1;
      color: white;
      border: none;
    }
    
    .btn.primary:hover {
      background: #4f46e5;
      transform: translateY(-2px);
    }
    
    .btn.secondary {
      background: #10b981;
      color: white;
      border: none;
    }
    
    .btn.secondary:hover {
      background: #059669;
    }
    
    .btn.outline {
      background: white;
      color: #6366f1;
      border: 2px solid #6366f1;
    }
    
    .btn.outline:hover {
      background: #6366f1;
      color: white;
    }
    
    @media (max-width: 768px) {
      .quick-view-overlay {
        padding: 1rem;
      }
      
      .quick-view-content {
        grid-template-columns: 1fr;
      }
      
      .image-section {
        padding: 1rem;
      }
      
      .info-section {
        padding: 1rem;
      }
      
      .detail-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 0, transform: 'translateY(50px)' }))
      ])
    ])
  ]
})
export class QuickViewComponent implements OnInit {
  @Input() artwork: Artwork | null = null;
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() viewFullDetails = new EventEmitter<string>();
  @Output() saveToggle = new EventEmitter<string>();

  selectedImageIndex = 0;
  isSaved = false;
  currentImage: string = '';

  ngOnInit() {
    if (this.artwork) {
      this.checkIfSaved();
      this.currentImage = this.artwork.image || this.artwork.imageUrl;
    }
  }

  ngOnChanges() {
    if (this.artwork) {
      this.checkIfSaved();
      this.selectedImageIndex = 0;
      this.currentImage = this.artwork.image || this.artwork.imageUrl;
    }
  }

  checkIfSaved() {
    // Mock implementation - in a real app, this would check the service
    this.isSaved = Math.random() > 0.5;
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
    if (this.artwork && this.artwork.images) {
      // Update the displayed image
      this.currentImage = this.artwork.images[index];
    }
  }

  toggleSave() {
    if (this.artwork) {
      this.isSaved = !this.isSaved;
      this.saveToggle.emit(this.artwork.id);
    }
  }

  openFullView() {
    if (this.artwork) {
      this.viewFullDetails.emit(this.artwork.id);
    }
  }

  openFullDetails() {
    if (this.artwork) {
      this.viewFullDetails.emit(this.artwork.id);
      this.close();
    }
  }

  contactArtist() {
    // Implement contact artist functionality
    console.log('Contact artist for:', this.artwork?.title);
  }

  shareArtwork() {
    if (this.artwork) {
      const shareText = `Check out this artwork: ${this.artwork.title} by ${this.artwork.artist}`;
      
      if (navigator.share) {
        navigator.share({
          title: this.artwork.title,
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Artwork details copied to clipboard!');
      }
    }
  }

  close() {
    this.closeEvent.emit();
  }
}
