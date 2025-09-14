import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" [@slideDown]>
      <nav class="nav-container">
        <div class="nav-brand">
          <a routerLink="/" class="brand-link">
            <span class="brand-icon">🎨</span>
            <span class="brand-text">Art Gallery</span>
          </a>
        </div>
        
        <div class="nav-menu" [class.active]="isMenuOpen">
          <a routerLink="/" 
             routerLinkActive="active" 
             [routerLinkActiveOptions]="{exact: true}"
             class="nav-link"
             (click)="closeMenu()">
            Gallery
          </a>
          <a routerLink="/artists" 
             routerLinkActive="active" 
             class="nav-link"
             (click)="closeMenu()">
            Artists
          </a>
          <a routerLink="/exhibitions" 
             routerLinkActive="active" 
             class="nav-link"
             (click)="closeMenu()">
            Exhibitions
          </a>
          <a routerLink="/news" 
             routerLinkActive="active" 
             class="nav-link"
             (click)="closeMenu()">
            News
          </a>
          <a routerLink="/about" 
             routerLinkActive="active" 
             class="nav-link"
             (click)="closeMenu()">
            About
          </a>
          <a routerLink="/contact" 
             routerLinkActive="active" 
             class="nav-link"
             (click)="closeMenu()">
            Contact
          </a>
          <a routerLink="/saved" 
             routerLinkActive="active" 
             class="nav-link"
             (click)="closeMenu()">
            <span class="nav-icon">❤️</span>
            Saved
          </a>
        </div>
        
        <button class="menu-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #333;
      font-weight: 700;
      font-size: 1.5rem;
      transition: color 0.3s ease;
    }
    
    .brand-link:hover {
      color: #6366f1;
    }
    
    .brand-icon {
      font-size: 2rem;
    }
    
    .nav-menu {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    
    .nav-link {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .nav-link:hover {
      color: #333;
      background: rgba(99, 102, 241, 0.1);
    }
    
    .nav-link.active {
      color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }
    
    .nav-icon {
      font-size: 1rem;
    }
    
    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .hamburger-line {
      width: 25px;
      height: 3px;
      background: #333;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    
    .menu-toggle.active .hamburger-line:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    
    .menu-toggle.active .hamburger-line:nth-child(2) {
      opacity: 0;
    }
    
    .menu-toggle.active .hamburger-line:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .menu-toggle {
        display: flex;
      }
    }
  `],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HeaderComponent {
  isMenuOpen = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    this.isMenuOpen = false;
  }
}
