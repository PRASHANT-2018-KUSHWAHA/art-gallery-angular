import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <!-- Hero Section -->
      <section class="hero-section" [@fadeIn]>
        <div class="hero-content">
          <h1 class="hero-title">About Our Art Gallery</h1>
          <p class="hero-subtitle">
            Discover the beauty of contemporary and classical art through our curated collection
          </p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="mission-section">
        <div class="container">
          <div class="mission-content" [@slideInLeft]>
            <h2 class="section-title">Our Mission</h2>
            <p class="mission-text">
              We believe that art has the power to inspire, transform, and connect people across cultures and generations. 
              Our mission is to make exceptional artwork accessible to everyone, while supporting talented artists 
              and fostering a vibrant creative community.
            </p>
            <div class="mission-stats">
              <div class="stat-item" [@fadeInUp] [@delay]="200">
                <div class="stat-number">500+</div>
                <div class="stat-label">Artworks</div>
              </div>
              <div class="stat-item" [@fadeInUp] [@delay]="400">
                <div class="stat-number">150+</div>
                <div class="stat-label">Artists</div>
              </div>
              <div class="stat-item" [@fadeInUp] [@delay]="600">
                <div class="stat-number">25+</div>
                <div class="stat-label">Countries</div>
              </div>
              <div class="stat-item" [@fadeInUp] [@delay]="800">
                <div class="stat-number">10K+</div>
                <div class="stat-label">Visitors</div>
              </div>
            </div>
          </div>
          <div class="mission-image" [@slideInRight]>
            <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop" 
                 alt="Gallery Interior" 
                 class="mission-img">
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values-section">
        <div class="container">
          <h2 class="section-title text-center" [@fadeInUp]>Our Values</h2>
          <div class="values-grid">
            <div class="value-card" [@fadeInUp] [@delay]="200">
              <div class="value-icon">🎨</div>
              <h3 class="value-title">Artistic Excellence</h3>
              <p class="value-description">
                We curate only the highest quality artworks that represent the pinnacle of artistic achievement.
              </p>
            </div>
            <div class="value-card" [@fadeInUp] [@delay]="400">
              <div class="value-icon">🌍</div>
              <h3 class="value-title">Cultural Diversity</h3>
              <p class="value-description">
                We celebrate artists from diverse backgrounds and cultures, promoting global artistic expression.
              </p>
            </div>
            <div class="value-card" [@fadeInUp] [@delay]="600">
              <div class="value-icon">🤝</div>
              <h3 class="value-title">Artist Support</h3>
              <p class="value-description">
                We provide a platform that supports emerging and established artists in their creative journey.
              </p>
            </div>
            <div class="value-card" [@fadeInUp] [@delay]="800">
              <div class="value-icon">💡</div>
              <h3 class="value-title">Innovation</h3>
              <p class="value-description">
                We embrace new technologies and approaches to make art more accessible and engaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section">
        <div class="container">
          <h2 class="section-title text-center" [@fadeInUp]>Meet Our Team</h2>
          <div class="team-grid">
            <div class="team-member" [@fadeInUp] [@delay]="200">
              <div class="member-image">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" 
                     alt="Sarah Johnson" 
                     class="member-img">
              </div>
              <div class="member-info">
                <h3 class="member-name">Sarah Johnson</h3>
                <p class="member-role">Gallery Director</p>
                <p class="member-bio">
                  With over 15 years in the art world, Sarah brings passion and expertise to every exhibition.
                </p>
              </div>
            </div>
            <div class="team-member" [@fadeInUp] [@delay]="400">
              <div class="member-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                     alt="Michael Chen" 
                     class="member-img">
              </div>
              <div class="member-info">
                <h3 class="member-name">Michael Chen</h3>
                <p class="member-role">Curator</p>
                <p class="member-bio">
                  Michael's keen eye for contemporary art has helped discover many emerging talents.
                </p>
              </div>
            </div>
            <div class="team-member" [@fadeInUp] [@delay]="600">
              <div class="member-image">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" 
                     alt="Emily Rodriguez" 
                     class="member-img">
              </div>
              <div class="member-info">
                <h3 class="member-name">Emily Rodriguez</h3>
                <p class="member-role">Art Consultant</p>
                <p class="member-bio">
                  Emily helps collectors find the perfect pieces to enhance their collections and spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="container">
          <div class="contact-content">
            <div class="contact-info" [@slideInLeft]>
              <h2 class="section-title">Get in Touch</h2>
              <p class="contact-description">
                We'd love to hear from you! Whether you're an artist looking to showcase your work, 
                a collector seeking advice, or simply an art enthusiast, we're here to help.
              </p>
              <div class="contact-details">
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <div>
                    <h4>Address</h4>
                    <p>123 Art Street, Creative District<br>New York, NY 10001</p>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📞</span>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <p>info&#64;artgallery.com</p>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">🕒</span>
                  <div>
                    <h4>Hours</h4>
                    <p>Mon-Fri: 10AM-6PM<br>Sat-Sun: 12PM-5PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="contact-form" [@slideInRight]>
              <form class="form">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" class="form-input" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input type="text" id="subject" name="subject" class="form-input" required>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" class="form-textarea" rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      min-height: 100vh;
    }
    
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8rem 2rem 6rem;
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
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .mission-section {
      padding: 6rem 0;
      background: white;
    }
    
    .mission-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 2rem;
    }
    
    .text-center {
      text-align: center;
    }
    
    .mission-text {
      font-size: 1.1rem;
      color: #4a5568;
      line-height: 1.8;
      margin-bottom: 3rem;
    }
    
    .mission-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #6366f1;
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      font-size: 1rem;
      color: #718096;
      font-weight: 600;
    }
    
    .mission-image {
      position: relative;
    }
    
    .mission-img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .values-section {
      padding: 6rem 0;
      background: #f8fafc;
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .value-card {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    
    .value-card:hover {
      transform: translateY(-5px);
    }
    
    .value-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .value-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 1rem;
    }
    
    .value-description {
      color: #4a5568;
      line-height: 1.6;
    }
    
    .team-section {
      padding: 6rem 0;
      background: white;
    }
    
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
      margin-top: 3rem;
    }
    
    .team-member {
      text-align: center;
    }
    
    .member-image {
      margin-bottom: 1.5rem;
    }
    
    .member-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto;
      display: block;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .member-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .member-role {
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .member-bio {
      color: #4a5568;
      line-height: 1.6;
    }
    
    .contact-section {
      padding: 6rem 0;
      background: #f8fafc;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
    
    .contact-description {
      font-size: 1.1rem;
      color: #4a5568;
      line-height: 1.8;
      margin-bottom: 3rem;
    }
    
    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .contact-icon {
      font-size: 1.5rem;
      margin-top: 0.25rem;
    }
    
    .contact-item h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.25rem;
    }
    
    .contact-item p {
      color: #4a5568;
      margin: 0;
    }
    
    .form {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }
    
    .form-input, .form-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .submit-button {
      background: #6366f1;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 100%;
    }
    
    .submit-button:hover {
      background: #4f46e5;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .mission-content, .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .mission-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      
      .values-grid, .team-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s ease', style({ opacity: 1 }))
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
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('delay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s ease', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent {}
