import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Art Gallery</h3>
          <p>Discover and appreciate beautiful artworks from talented artists around the world.</p>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="footer-link">Gallery</a></li>
            <li><a routerLink="/artists" routerLinkActive="active" class="footer-link">Artists</a></li>
            <!-- <li><a routerLink="/exhibitions" routerLinkActive="active" class="footer-link">Exhibitions</a></li> -->
            <!-- <li><a routerLink="/news" routerLinkActive="active" class="footer-link">News</a></li> -->
            <li><a routerLink="/about" routerLinkActive="active" class="footer-link">About</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" class="footer-link">Contact</a></li>
            <li><a routerLink="/saved" routerLinkActive="active" class="footer-link"><span class="nav-icon">❤️</span> Saved</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="#paintings">Paintings</a></li>
            <li><a href="#sculptures">Sculptures</a></li>
            <li><a href="#photography">Photography</a></li>
            <li><a href="#digital">Digital Art</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Connect</h4>
          <div class="social-links">
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Facebook</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Art Gallery. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a1a;
      color: white;
      padding: 3rem 0 1rem;
      margin-top: auto;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .footer-section h3 {
      color: #6366f1;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    
    .footer-section h4 {
      margin-bottom: 1rem;
      color: #e5e7eb;
    }
    
    .footer-section p {
      color: #9ca3af;
      line-height: 1.6;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    
    .footer-section ul li a {
      color: #9ca3af;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-section ul li a:hover {
      color: #6366f1;
    }

    .footer-section ul li a.active {
      color: #6366f1;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      color: #9ca3af;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid #374151;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      color: #6366f1;
      border-color: #6366f1;
    }
    
    .footer-bottom {
      border-top: 1px solid #374151;
      margin-top: 2rem;
      padding-top: 1rem;
      text-align: center;
      color: #9ca3af;
    }
  `]
})
export class FooterComponent {}
