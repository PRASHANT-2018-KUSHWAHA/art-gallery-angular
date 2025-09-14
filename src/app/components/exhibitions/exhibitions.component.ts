import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface Exhibition {
  id: string;
  title: string;
  description: string;
  curator: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  status: 'upcoming' | 'current' | 'past';
  featuredArtists: string[];
  ticketPrice?: number;
  isFree: boolean;
}

@Component({
  selector: 'app-exhibitions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exhibitions-container" [@fadeInUp]>
      <!-- Hero Section -->
      <section class="exhibitions-hero">
        <div class="hero-content">
          <h1 class="hero-title">Exhibitions</h1>
          <p class="hero-subtitle">Discover our current and upcoming exhibitions featuring exceptional artworks from around the world</p>
        </div>
      </section>

      <!-- Filter Tabs -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-tabs">
            <button 
              *ngFor="let status of statusOptions" 
              [class]="'filter-tab ' + (selectedStatus === status ? 'active' : '')"
              (click)="selectStatus(status)">
              {{ status | titlecase }}
            </button>
          </div>
        </div>
      </section>

      <!-- Exhibitions Grid -->
      <section class="exhibitions-section">
        <div class="exhibitions-header">
          <h2 class="section-title">{{ selectedStatus | titlecase }} Exhibitions</h2>
          <p class="section-subtitle">{{ filteredExhibitions.length }} exhibitions found</p>
        </div>
        
        <div class="exhibitions-grid" [@staggerFadeIn]>
          <div 
            *ngFor="let exhibition of filteredExhibitions; trackBy: trackByExhibitionId"
            class="exhibition-card"
            [class]="'exhibition-card--' + exhibition.status"
            [@fadeInUp]>
            <div class="exhibition-image-container">
              <img [src]="exhibition.image" [alt]="exhibition.title" class="exhibition-image">
              <div class="exhibition-status" [class]="'status--' + exhibition.status">
                {{ exhibition.status | titlecase }}
              </div>
              <div class="exhibition-overlay">
                <button class="view-details-btn">View Details</button>
              </div>
            </div>
            
            <div class="exhibition-info">
              <h3 class="exhibition-title">{{ exhibition.title }}</h3>
              <p class="exhibition-curator">Curated by {{ exhibition.curator }}</p>
              <p class="exhibition-description">{{ exhibition.description }}</p>
              
              <div class="exhibition-details">
                <div class="detail-item">
                  <span class="detail-icon">📅</span>
                  <span class="detail-text">{{ exhibition.startDate }} - {{ exhibition.endDate }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">📍</span>
                  <span class="detail-text">{{ exhibition.location }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">🎨</span>
                  <span class="detail-text">{{ exhibition.featuredArtists.length }} artists</span>
                </div>
              </div>
              
              <div class="exhibition-footer">
                <div class="ticket-info">
                  <span *ngIf="exhibition.isFree" class="ticket-price free">Free</span>
                  <span *ngIf="!exhibition.isFree" class="ticket-price">{{ exhibition.ticketPrice }}</span>
                </div>
                <button class="book-ticket-btn" [disabled]="exhibition.status === 'past'">
                  {{ exhibition.status === 'past' ? 'Ended' : 'Book Tickets' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div *ngIf="filteredExhibitions.length === 0" class="no-results">
          <div class="no-results-content">
            <span class="no-results-icon">🎭</span>
            <h3>No exhibitions found</h3>
            <p>Check back soon for new exhibitions</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .exhibitions-container {
      min-height: 100vh;
    }
    
    .exhibitions-hero {
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
    }
    
    .filter-tabs {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    
    .filter-tab {
      padding: 0.75rem 1.5rem;
      border: 2px solid #e5e7eb;
      background: white;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .filter-tab:hover {
      border-color: #6366f1;
      color: #6366f1;
    }
    
    .filter-tab.active {
      background: #6366f1;
      border-color: #6366f1;
      color: white;
    }
    
    .exhibitions-section {
      padding: 4rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .exhibitions-header {
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
    
    .exhibitions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 2rem;
    }
    
    .exhibition-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .exhibition-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .exhibition-card--upcoming {
      border-left: 4px solid #10b981;
    }
    
    .exhibition-card--current {
      border-left: 4px solid #f59e0b;
    }
    
    .exhibition-card--past {
      border-left: 4px solid #6b7280;
      opacity: 0.8;
    }
    
    .exhibition-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    
    .exhibition-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .exhibition-card:hover .exhibition-image {
      transform: scale(1.05);
    }
    
    .exhibition-status {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status--upcoming {
      background: #10b981;
      color: white;
    }
    
    .status--current {
      background: #f59e0b;
      color: white;
    }
    
    .status--past {
      background: #6b7280;
      color: white;
    }
    
    .exhibition-overlay {
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
    
    .exhibition-card:hover .exhibition-overlay {
      opacity: 1;
    }
    
    .view-details-btn {
      background: white;
      color: #6366f1;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .view-details-btn:hover {
      background: #6366f1;
      color: white;
    }
    
    .exhibition-info {
      padding: 1.5rem;
    }
    
    .exhibition-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .exhibition-curator {
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .exhibition-description {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .exhibition-details {
      margin-bottom: 1.5rem;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .detail-icon {
      font-size: 1rem;
    }
    
    .detail-text {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .exhibition-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .ticket-price {
      font-weight: 700;
      color: #1a202c;
    }
    
    .ticket-price.free {
      color: #10b981;
    }
    
    .book-ticket-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .book-ticket-btn:hover:not(:disabled) {
      background: #4f46e5;
    }
    
    .book-ticket-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
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
      .filter-tabs {
        flex-direction: column;
        align-items: center;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .exhibitions-grid {
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
export class ExhibitionsComponent implements OnInit {
  exhibitions: Exhibition[] = [];
  filteredExhibitions: Exhibition[] = [];
  selectedStatus: 'upcoming' | 'current' | 'past' = 'current';
  statusOptions: ('upcoming' | 'current' | 'past')[] = ['upcoming', 'current', 'past'];

  ngOnInit() {
    this.loadExhibitions();
  }

  loadExhibitions() {
    // Mock data - in a real app, this would come from a service
    this.exhibitions = [
      {
        id: '1',
        title: 'Abstract Expressions',
        description: 'A stunning collection of contemporary abstract artworks that explore the boundaries of color, form, and emotion.',
        curator: 'Dr. Sarah Williams',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        location: 'Main Gallery, Floor 1',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
        status: 'current',
        featuredArtists: ['Sarah Johnson', 'Michael Chen'],
        ticketPrice: 15,
        isFree: false
      },
      {
        id: '2',
        title: 'Digital Futures',
        description: 'Exploring the intersection of technology and art through innovative digital installations and interactive pieces.',
        curator: 'Alex Rodriguez',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        location: 'Digital Gallery, Floor 2',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        status: 'current',
        featuredArtists: ['Michael Chen', 'David Kim'],
        ticketPrice: 20,
        isFree: false
      },
      {
        id: '3',
        title: 'Sculptural Forms',
        description: 'A celebration of three-dimensional art featuring works in bronze, marble, and contemporary materials.',
        curator: 'Elena Martinez',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        location: 'Sculpture Garden',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        status: 'upcoming',
        featuredArtists: ['Elena Rodriguez', 'James Wilson'],
        ticketPrice: 12,
        isFree: false
      },
      {
        id: '4',
        title: 'Nature\'s Palette',
        description: 'Watercolor masterpieces capturing the beauty of the natural world in delicate, flowing compositions.',
        curator: 'Anna Petrov',
        startDate: '2024-04-15',
        endDate: '2024-06-15',
        location: 'Watercolor Gallery, Floor 3',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
        status: 'upcoming',
        featuredArtists: ['Anna Petrov'],
        isFree: true
      },
      {
        id: '5',
        title: 'Urban Stories',
        description: 'Street art and urban photography that tells the stories of city life and community.',
        curator: 'James Wilson',
        startDate: '2023-10-01',
        endDate: '2023-12-31',
        location: 'Street Art Gallery',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        status: 'past',
        featuredArtists: ['James Wilson', 'David Kim'],
        ticketPrice: 10,
        isFree: false
      },
      {
        id: '6',
        title: 'Photographic Visions',
        description: 'A retrospective of landscape photography showcasing the world\'s most beautiful natural scenes.',
        curator: 'David Kim',
        startDate: '2023-08-01',
        endDate: '2023-10-31',
        location: 'Photography Gallery, Floor 2',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        status: 'past',
        featuredArtists: ['David Kim'],
        ticketPrice: 8,
        isFree: false
      }
    ];

    this.filterExhibitions();
  }

  selectStatus(status: 'upcoming' | 'current' | 'past') {
    this.selectedStatus = status;
    this.filterExhibitions();
  }

  filterExhibitions() {
    this.filteredExhibitions = this.exhibitions.filter(exhibition => 
      exhibition.status === this.selectedStatus
    );
  }

  trackByExhibitionId(index: number, exhibition: Exhibition): string {
    return exhibition.id;
  }
}
