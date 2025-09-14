import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  image: string;
  category: string;
  readTime: number;
  featured: boolean;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="news-container" [@fadeInUp]>
      <!-- Hero Section -->
      <section class="news-hero">
        <div class="hero-content">
          <h1 class="hero-title">Art News & Blog</h1>
          <p class="hero-subtitle">Stay updated with the latest art trends, artist spotlights, and gallery news</p>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section">
        <div class="filter-container">
          <div class="filter-group">
            <label class="filter-label">Search Articles</label>
            <input 
              type="text" 
              [(ngModel)]="searchTerm"
              (input)="filterArticles()"
              placeholder="Search articles, authors, or topics..."
              class="search-input">
          </div>
          
          <div class="filter-group">
            <label class="filter-label">Category</label>
            <select 
              [(ngModel)]="selectedCategory"
              (change)="filterArticles()"
              class="filter-select">
              <option value="">All Categories</option>
              <option *ngFor="let category of categories" [value]="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- Featured Article -->
      <section class="featured-section" *ngIf="featuredArticle">
        <div class="featured-container">
          <h2 class="section-title">Featured Article</h2>
          <div class="featured-article" [@fadeInUp]>
            <div class="featured-image-container">
              <img [src]="featuredArticle.image" [alt]="featuredArticle.title" class="featured-image">
              <div class="featured-badge">Featured</div>
            </div>
            <div class="featured-content">
              <div class="article-meta">
                <span class="article-category">{{ featuredArticle.category }}</span>
                <span class="article-date">{{ featuredArticle.publishDate }}</span>
                <span class="article-read-time">{{ featuredArticle.readTime }} min read</span>
              </div>
              <h3 class="featured-title">{{ featuredArticle.title }}</h3>
              <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
              <div class="article-author">
                <span class="author-label">By</span>
                <span class="author-name">{{ featuredArticle.author }}</span>
              </div>
              <button class="read-more-btn">Read Full Article</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Articles Grid -->
      <section class="articles-section">
        <div class="articles-header">
          <h2 class="section-title">Latest Articles</h2>
          <p class="section-subtitle">{{ filteredArticles.length }} articles found</p>
        </div>
        
        <div class="articles-grid" [@staggerFadeIn]>
          <article 
            *ngFor="let article of filteredArticles; trackBy: trackByArticleId"
            class="article-card"
            [@fadeInUp]>
            <div class="article-image-container">
              <img [src]="article.image" [alt]="article.title" class="article-image">
              <div class="article-category-badge">{{ article.category }}</div>
            </div>
            
            <div class="article-content">
              <div class="article-meta">
                <span class="article-date">{{ article.publishDate }}</span>
                <span class="article-read-time">{{ article.readTime }} min read</span>
              </div>
              
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              
              <div class="article-footer">
                <div class="article-author">
                  <span class="author-label">By</span>
                  <span class="author-name">{{ article.author }}</span>
                </div>
                <button class="read-more-btn">Read More</button>
              </div>
            </div>
          </article>
        </div>
        
        <div *ngIf="filteredArticles.length === 0" class="no-results">
          <div class="no-results-content">
            <span class="no-results-icon">📰</span>
            <h3>No articles found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .news-container {
      min-height: 100vh;
    }
    
    .news-hero {
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
    
    .featured-section {
      padding: 4rem 2rem;
      background: white;
    }
    
    .featured-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .featured-article {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .featured-image-container {
      position: relative;
      height: 400px;
      overflow: hidden;
    }
    
    .featured-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .featured-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: #6366f1;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .featured-content {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .article-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #6b7280;
    }
    
    .article-category {
      background: #f3f4f6;
      color: #6366f1;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 600;
    }
    
    .featured-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    
    .featured-excerpt {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    
    .article-author {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .author-label {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .author-name {
      font-weight: 600;
      color: #1a202c;
    }
    
    .read-more-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
      align-self: flex-start;
    }
    
    .read-more-btn:hover {
      background: #4f46e5;
    }
    
    .articles-section {
      padding: 4rem 2rem;
      background: #f8fafc;
    }
    
    .articles-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-subtitle {
      color: #718096;
      font-size: 1.1rem;
    }
    
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .article-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .article-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .article-image-container {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    
    .article-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .article-card:hover .article-image {
      transform: scale(1.05);
    }
    
    .article-category-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(99, 102, 241, 0.9);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .article-content {
      padding: 1.5rem;
    }
    
    .article-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }
    
    .article-excerpt {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .article-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
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
      
      .featured-article {
        grid-template-columns: 1fr;
      }
      
      .articles-grid {
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
export class NewsComponent implements OnInit {
  articles: NewsArticle[] = [];
  filteredArticles: NewsArticle[] = [];
  featuredArticle: NewsArticle | null = null;
  searchTerm = '';
  selectedCategory = '';
  categories: string[] = [];

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    // Mock data - in a real app, this would come from a service
    this.articles = [
      {
        id: '1',
        title: 'The Future of Digital Art: Exploring New Frontiers',
        excerpt: 'Digital art continues to evolve with new technologies, creating unprecedented opportunities for artists to express their creativity.',
        content: 'Full article content here...',
        author: 'Sarah Johnson',
        publishDate: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
        category: 'Digital Art',
        readTime: 5,
        featured: true
      },
      {
        id: '2',
        title: 'Spotlight: Emerging Artists to Watch in 2024',
        excerpt: 'Discover the rising stars in the art world who are making waves with their innovative approaches and unique perspectives.',
        content: 'Full article content here...',
        author: 'Michael Chen',
        publishDate: '2024-01-12',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        category: 'Artist Spotlight',
        readTime: 7,
        featured: false
      },
      {
        id: '3',
        title: 'The Art of Sculpture: Traditional Techniques Meet Modern Materials',
        excerpt: 'Contemporary sculptors are blending age-old techniques with innovative materials to create stunning new works.',
        content: 'Full article content here...',
        author: 'Elena Rodriguez',
        publishDate: '2024-01-10',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        category: 'Sculpture',
        readTime: 6,
        featured: false
      },
      {
        id: '4',
        title: 'Photography as Fine Art: Capturing Emotion Through the Lens',
        excerpt: 'How photographers are elevating their craft to fine art status through composition, lighting, and storytelling.',
        content: 'Full article content here...',
        author: 'David Kim',
        publishDate: '2024-01-08',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
        category: 'Photography',
        readTime: 4,
        featured: false
      },
      {
        id: '5',
        title: 'Watercolor Mastery: Techniques from the Masters',
        excerpt: 'Learn the secrets of watercolor painting from renowned artists who have mastered this delicate medium.',
        content: 'Full article content here...',
        author: 'Anna Petrov',
        publishDate: '2024-01-05',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        category: 'Techniques',
        readTime: 8,
        featured: false
      },
      {
        id: '6',
        title: 'Street Art Goes Mainstream: From Walls to Galleries',
        excerpt: 'The evolution of street art from underground movement to respected art form in galleries worldwide.',
        content: 'Full article content here...',
        author: 'James Wilson',
        publishDate: '2024-01-03',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        category: 'Street Art',
        readTime: 5,
        featured: false
      }
    ];

    this.featuredArticle = this.articles.find(article => article.featured) || null;
    this.filteredArticles = this.articles.filter(article => !article.featured);
    this.categories = [...new Set(this.articles.map(article => article.category))];
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(article => {
      if (article.featured) return false; // Exclude featured articles from the grid
      
      const matchesSearch = !this.searchTerm || 
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        article.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  trackByArticleId(index: number, article: NewsArticle): string {
    return article.id;
  }
}
