import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtworkCategory, GalleryFilter } from '../../models/artwork.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-gallery-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-container">
      <div class="filter-header">
        <h3 class="filter-title">Filter & Search</h3>
        <button class="clear-all-btn" (click)="clearAllFilters()" *ngIf="hasActiveFilters">
          Clear All
        </button>
      </div>
      
      <div class="filter-grid">
        <!-- Search Input -->
        <div class="filter-group">
          <label class="filter-label">Search</label>
          <div class="search-input-container">
            <input 
              type="text" 
              [(ngModel)]="filter.searchTerm"
              (input)="onFilterChange()"
              placeholder="Search artworks, artists, or tags..."
              class="search-input">
            <span class="search-icon">🔍</span>
          </div>
        </div>
        
        <!-- Category Filter -->
        <div class="filter-group">
          <label class="filter-label">Category</label>
          <select 
            [(ngModel)]="filter.category"
            (change)="onFilterChange()"
            class="filter-select">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories" [value]="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <!-- Price Range -->
        <div class="filter-group">
          <label class="filter-label">Price Range</label>
          <div class="price-range-container">
            <input 
              type="number" 
              [(ngModel)]="priceRange.min"
              (input)="updatePriceRange()"
              placeholder="Min"
              class="price-input">
            <span class="price-separator">-</span>
            <input 
              type="number" 
              [(ngModel)]="priceRange.max"
              (input)="updatePriceRange()"
              placeholder="Max"
              class="price-input">
          </div>
        </div>
        
        <!-- Year Range -->
        <div class="filter-group">
          <label class="filter-label">Year Range</label>
          <div class="year-range-container">
            <input 
              type="number" 
              [(ngModel)]="yearRange.min"
              (input)="updateYearRange()"
              placeholder="From"
              class="year-input">
            <span class="year-separator">-</span>
            <input 
              type="number" 
              [(ngModel)]="yearRange.max"
              (input)="updateYearRange()"
              placeholder="To"
              class="year-input">
          </div>
        </div>
        
        <!-- Featured Toggle -->
        <div class="filter-group">
          <label class="filter-label">Show Only</label>
          <div class="checkbox-container">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                [(ngModel)]="filter.featured"
                (change)="onFilterChange()"
                class="checkbox-input">
              <span class="checkbox-custom"></span>
              Featured Artworks
            </label>
          </div>
        </div>
        
        <!-- Sort Options -->
        <div class="filter-group">
          <label class="filter-label">Sort By</label>
          <select 
            [(ngModel)]="sortBy"
            (change)="onSortChange()"
            class="filter-select">
            <option value="title">Title A-Z</option>
            <option value="artist">Artist A-Z</option>
            <option value="year-desc">Year (Newest)</option>
            <option value="year-asc">Year (Oldest)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
      
      <!-- Active Filters Display -->
      <div class="active-filters" *ngIf="hasActiveFilters">
        <span class="active-filters-label">Active filters:</span>
        <div class="filter-tags">
          <span *ngIf="filter.searchTerm" class="filter-tag">
            Search: "{{ filter.searchTerm }}"
            <button (click)="removeSearchTerm()" class="tag-remove">×</button>
          </span>
          <span *ngIf="filter.category" class="filter-tag">
            Category: {{ getCategoryName(filter.category) }}
            <button (click)="removeCategory()" class="tag-remove">×</button>
          </span>
          <span *ngIf="filter.priceRange" class="filter-tag">
            Price: {{ filter.priceRange.min }} - {{ filter.priceRange.max }}
            <button (click)="removePriceRange()" class="tag-remove">×</button>
          </span>
          <span *ngIf="filter.yearRange" class="filter-tag">
            Year: {{ filter.yearRange.min }} - {{ filter.yearRange.max }}
            <button (click)="removeYearRange()" class="tag-remove">×</button>
          </span>
          <span *ngIf="filter.featured" class="filter-tag">
            Featured Only
            <button (click)="removeFeatured()" class="tag-remove">×</button>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter-container {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .filter-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
    }
    
    .clear-all-btn {
      background: #ef4444;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .clear-all-btn:hover {
      background: #dc2626;
    }
    
    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
    }
    
    .filter-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .search-input-container {
      position: relative;
    }
    
    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.9rem;
      transition: border-color 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }
    
    .filter-select {
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.9rem;
      background: white;
      cursor: pointer;
      transition: border-color 0.3s ease;
    }
    
    .filter-select:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .price-range-container, .year-range-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .price-input, .year-input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.9rem;
      transition: border-color 0.3s ease;
    }
    
    .price-input:focus, .year-input:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .price-separator, .year-separator {
      color: #6b7280;
      font-weight: 600;
    }
    
    .checkbox-container {
      display: flex;
      align-items: center;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      color: #374151;
    }
    
    .checkbox-input {
      display: none;
    }
    
    .checkbox-custom {
      width: 20px;
      height: 20px;
      border: 2px solid #d1d5db;
      border-radius: 4px;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .checkbox-input:checked + .checkbox-custom {
      background: #6366f1;
      border-color: #6366f1;
    }
    
    .checkbox-input:checked + .checkbox-custom::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
    
    .active-filters {
      border-top: 1px solid #e5e7eb;
      padding-top: 1.5rem;
    }
    
    .active-filters-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
      display: block;
    }
    
    .filter-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .filter-tag {
      background: #6366f1;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .tag-remove {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.2rem;
      line-height: 1;
      padding: 0;
      margin-left: 0.25rem;
    }
    
    .tag-remove:hover {
      color: #fbbf24;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class GalleryFilterComponent implements OnInit {
  @Input() categories: ArtworkCategory[] = [];
  @Input() filter: GalleryFilter = {};
  @Output() filterChange = new EventEmitter<GalleryFilter>();
  
  priceRange = { min: 0, max: 10000 };
  yearRange = { min: 1900, max: new Date().getFullYear() };
  sortBy = 'title';

  ngOnInit(): void {
    this.initializeRanges();
  }

  private initializeRanges(): void {
    if (this.filter.priceRange) {
      this.priceRange = { ...this.filter.priceRange };
    }
    if (this.filter.yearRange) {
      this.yearRange = { ...this.filter.yearRange };
    }
  }

  onFilterChange(): void {
    this.filterChange.emit({ ...this.filter });
  }

  updatePriceRange(): void {
    this.filter.priceRange = this.priceRange.min > 0 || this.priceRange.max < 10000 
      ? { ...this.priceRange } 
      : undefined;
    this.onFilterChange();
  }

  updateYearRange(): void {
    this.filter.yearRange = this.yearRange.min > 1900 || this.yearRange.max < new Date().getFullYear()
      ? { ...this.yearRange }
      : undefined;
    this.onFilterChange();
  }

  onSortChange(): void {
    // Emit sort change event if needed
    this.onFilterChange();
  }

  clearAllFilters(): void {
    this.filter = {};
    this.priceRange = { min: 0, max: 10000 };
    this.yearRange = { min: 1900, max: new Date().getFullYear() };
    this.sortBy = 'title';
    this.onFilterChange();
  }

  removeSearchTerm(): void {
    this.filter.searchTerm = undefined;
    this.onFilterChange();
  }

  removeCategory(): void {
    this.filter.category = undefined;
    this.onFilterChange();
  }

  removePriceRange(): void {
    this.filter.priceRange = undefined;
    this.priceRange = { min: 0, max: 10000 };
    this.onFilterChange();
  }

  removeYearRange(): void {
    this.filter.yearRange = undefined;
    this.yearRange = { min: 1900, max: new Date().getFullYear() };
    this.onFilterChange();
  }

  removeFeatured(): void {
    this.filter.featured = undefined;
    this.onFilterChange();
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.filter.searchTerm ||
      this.filter.category ||
      this.filter.priceRange ||
      this.filter.yearRange ||
      this.filter.featured
    );
  }
}
