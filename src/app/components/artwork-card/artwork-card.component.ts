import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Artwork } from '../../models/artwork.model';
import { ArtworkService } from '../../services/artwork.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-artwork-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="artwork-card" 
         [@cardHover]
         (mouseenter)="onMouseEnter()"
         (mouseleave)="onMouseLeave()">
      
      <div class="card-image-container">
        <img [src]="artwork.thumbnailUrl" 
             [alt]="artwork.title"
             class="card-image"
             [@imageLoad]="imageLoaded ? 'loaded' : 'loading'"
             (load)="onImageLoad()">
        
        <div class="card-overlay" [@overlayFade]="isHovered ? 'visible' : 'hidden'">
          <div class="overlay-content">
            <button class="quick-view-btn" (click)="openQuickView()">
              <span class="btn-icon">👁️</span>
              Quick View
            </button>
            <button class="favorite-btn" (click)="toggleFavorite()">
              <span class="btn-icon">{{ isFavorite ? '❤️' : '🤍' }}</span>
            </button>
          </div>
        </div>
        
        <div class="card-badge" *ngIf="artwork.featured">
          Featured
        </div>
      </div>
      
      <div class="card-content">
        <div class="card-header">
          <h3 class="artwork-title">{{ artwork.title }}</h3>
          <p class="artwork-artist">by {{ artwork.artist }}</p>
        </div>
        
        <div class="card-details">
          <span class="artwork-year">{{ artwork.year }}</span>
          <span class="artwork-medium">{{ artwork.medium }}</span>
        </div>
        
        <div class="card-description">
          <p>{{ artwork.description }}</p>
        </div>
        
        <div class="card-footer">
          <div class="artwork-price" *ngIf="artwork.price">
            {{ artwork.price | currency:'INR':'symbol':'1.0-0' }}
          </div>
          <div class="card-actions">
            <button class="action-btn primary" (click)="viewDetails()">
              View Details
            </button>
            <button class="action-btn secondary" (click)="toggleFavorite()">
              {{ isFavorite ? 'Saved' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .artwork-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
    }
    
    .artwork-card:hover {
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
    
    .artwork-card:hover .card-image {
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
    }
    
    .overlay-content {
      display: flex;
      gap: 1rem;
    }
    
    .quick-view-btn, .favorite-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .quick-view-btn:hover {
      background: white;
      transform: scale(1.05);
    }
    
    .favorite-btn {
      padding: 0.75rem;
      border-radius: 50%;
    }
    
    .favorite-btn:hover {
      background: white;
      transform: scale(1.1);
    }
    
    .card-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #6366f1;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .card-header {
      margin-bottom: 1rem;
    }
    
    .artwork-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.25rem;
      line-height: 1.3;
    }
    
    .artwork-artist {
      color: #718096;
      font-size: 0.9rem;
      margin: 0;
    }
    
    .card-details {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      color: #4a5568;
    }
    
    .artwork-year {
      font-weight: 600;
    }
    
    .card-description {
      margin-bottom: 1.5rem;
    }
    
    .card-description p {
      color: #4a5568;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .artwork-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #6366f1;
    }
    
    .card-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .action-btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }
    
    .action-btn.primary {
      background: #6366f1;
      color: white;
    }
    
    .action-btn.primary:hover {
      background: #4f46e5;
      transform: translateY(-1px);
    }
    
    .action-btn.secondary {
      background: #f1f5f9;
      color: #4a5568;
      border: 1px solid #e2e8f0;
    }
    
    .action-btn.secondary:hover {
      background: #e2e8f0;
    }
  `],
  animations: [
    trigger('cardHover', [
      state('hover', style({
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      })),
      transition('* => hover', animate('0.3s ease')),
      transition('hover => *', animate('0.3s ease'))
    ]),
    trigger('overlayFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('0.3s ease')),
      transition('visible => hidden', animate('0.3s ease'))
    ]),
    trigger('imageLoad', [
      state('loading', style({ opacity: 0.7 })),
      state('loaded', style({ opacity: 1 })),
      transition('loading => loaded', animate('0.5s ease'))
    ])
  ]
})
export class ArtworkCardComponent implements OnInit {
  @Input() artwork!: Artwork;
  @Output() quickView = new EventEmitter<Artwork>();
  
  isHovered = false;
  isFavorite = false;
  imageLoaded = false;

  constructor(
    private router: Router,
    private artworkService: ArtworkService
  ) {}

  ngOnInit() {
    this.checkIfFavorite();
  }

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  checkIfFavorite(): void {
    this.isFavorite = this.artworkService.isArtworkSaved(this.artwork.id);
  }

  viewDetails(): void {
    this.router.navigate(['/artwork-detail', this.artwork.id]);
  }

  openQuickView(): void {
    this.quickView.emit(this.artwork);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.artworkService.saveArtwork(this.artwork.id);
    } else {
      this.artworkService.unsaveArtwork(this.artwork.id);
    }
  }
}
