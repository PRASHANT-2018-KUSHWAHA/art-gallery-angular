import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork, ArtworkCategory, GalleryFilter } from '../../models/artwork.model';
import { ArtworkCardComponent } from '../artwork-card/artwork-card.component';
import { QuickViewComponent } from '../quick-view/quick-view.component';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { GalleryFilterComponent } from '../gallery-filter/gallery-filter.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, ArtworkCardComponent, GalleryFilterComponent, QuickViewComponent],
  template: `
    <div class="gallery-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title" [@fadeInUp]>
            Discover Amazing Artworks
          </h1>
          <p class="hero-subtitle" [@fadeInUp] [@delay]="200">
            Explore our curated collection of contemporary and classical art pieces
          </p>
          <button class="cta-button" [@fadeInUp] [@delay]="400" (click)="scrollToGallery()">
            View Collection
          </button>
        </div>
        <div class="hero-image" [@fadeInRight] [@delay]="600">
          <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop" 
               alt="Featured Artwork" 
               class="hero-img">
        </div>
      </section>

      <!-- Filter Section -->
      <!-- <section class="filter-section">
        <app-gallery-filter 
          [categories]="categories"
          [filter]="currentFilter"
          (filterChange)="onFilterChange($event)">
        </app-gallery-filter>
      </section> -->

      <!-- Gallery Grid -->
      <section class="gallery-section" #gallerySection>
        <div class="gallery-header">
          <h2 class="gallery-title">Art Collection</h2>
          <p class="gallery-subtitle">{{ filteredArtworks.length }} artworks found</p>
        </div>
        
        <div class="gallery-grid" [@staggerFadeIn]>
          <app-artwork-card 
            *ngFor="let artwork of filteredArtworks; trackBy: trackByArtworkId"
            [artwork]="artwork"
            (quickView)="openQuickView($event)"
            [@fadeInUp]>
          </app-artwork-card>
        </div>
        
        <div *ngIf="filteredArtworks.length === 0" class="no-results">
          <div class="no-results-content">
            <span class="no-results-icon">🔍</span>
            <h3>No artworks found</h3>
            <p>Try adjusting your search criteria or browse all categories</p>
            <button class="clear-filters-btn" (click)="clearFilters()">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <!-- Quick View Modal -->
      <app-quick-view 
        [artwork]="selectedArtwork"
        [isOpen]="isQuickViewOpen"
        (closeEvent)="closeQuickView()"
        (viewFullDetails)="viewFullDetails($event)"
        (saveToggle)="toggleSave($event)">
      </app-quick-view>
    </div>
  `,
  styles: [`
    .gallery-container {
      min-height: 100vh;
    }
    
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      min-height: 80vh;
    }
    
    .hero-content {
      max-width: 600px;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .cta-button {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .cta-button:hover {
      background: white;
      color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .hero-image {
      position: relative;
    }
    
    .hero-img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .filter-section {
      padding: 2rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .gallery-section {
      padding: 4rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .gallery-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .gallery-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
    }
    
    .gallery-subtitle {
      color: #718096;
      font-size: 1.1rem;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
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
      margin-bottom: 2rem;
    }
    
    .clear-filters-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .clear-filters-btn:hover {
      background: #4f46e5;
    }
    
    @media (max-width: 768px) {
      .hero-section {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 4rem 1rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .gallery-grid {
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
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('delay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s ease-out', style({ opacity: 1 }))
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
export class GalleryComponent implements OnInit, OnDestroy {
  artworks: Artwork[] = [];
  categories: ArtworkCategory[] = [];
  filteredArtworks: Artwork[] = [];
  currentFilter: GalleryFilter = {};
  
  // Quick view properties
  selectedArtwork: Artwork | null = null;
  isQuickViewOpen = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private artworkService: ArtworkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load artworks and categories
    this.artworkService.getArtworks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(artworks => {
        this.artworks = artworks;
        this.updateFilteredArtworks();
      });

    this.artworkService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories;
      });

    // Subscribe to filtered artworks
    this.artworkService.getFilteredArtworks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(filtered => {
        this.filteredArtworks = filtered;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(filter: GalleryFilter): void {
    this.currentFilter = filter;
    this.artworkService.updateFilter(filter);
  }

  updateFilteredArtworks(): void {
    this.artworkService.updateFilter(this.currentFilter);
  }

  clearFilters(): void {
    this.currentFilter = {};
    this.artworkService.updateFilter({});
  }

  scrollToGallery(): void {
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  trackByArtworkId(index: number, artwork: Artwork): string {
    return artwork.id;
  }

  // Quick view methods
  openQuickView(artwork: Artwork): void {
    this.selectedArtwork = artwork;
    this.isQuickViewOpen = true;
  }

  closeQuickView(): void {
    this.isQuickViewOpen = false;
    this.selectedArtwork = null;
  }

  viewFullDetails(artworkId: string): void {
    this.closeQuickView();
    this.router.navigate(['/artwork-detail', artworkId]);
  }

  toggleSave(artworkId: string): void {
    if (this.artworkService.isArtworkSaved(artworkId)) {
      this.artworkService.unsaveArtwork(artworkId);
    } else {
      this.artworkService.saveArtwork(artworkId);
    }
  }
}
