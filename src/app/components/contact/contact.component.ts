import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container" [@fadeInUp]>
      <!-- Hero Section -->
      <section class="contact-hero">
        <div class="hero-content">
          <h1 class="hero-title">Get In Touch</h1>
          <p class="hero-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      <!-- Contact Form and Info -->
      <section class="contact-content">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2 class="section-title">Send us a Message</h2>
            <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="form-group">
                <label for="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="formData.name" 
                  required 
                  class="form-input"
                  placeholder="Your full name">
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="formData.email" 
                  required 
                  class="form-input"
                  placeholder="your.email@example.com">
              </div>
              
              <div class="form-group">
                <label for="subject">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  [(ngModel)]="formData.subject" 
                  required 
                  class="form-input"
                  placeholder="What's this about?">
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  [(ngModel)]="formData.message" 
                  required 
                  rows="6" 
                  class="form-textarea"
                  placeholder="Tell us more about your inquiry..."></textarea>
              </div>
              
              <button 
                type="submit" 
                class="submit-btn" 
                [disabled]="!contactForm.form.valid || isSubmitting">
                <span *ngIf="!isSubmitting">Send Message</span>
                <span *ngIf="isSubmitting">Sending...</span>
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="contact-info-section">
            <h2 class="section-title">Contact Information</h2>
            
            <div class="contact-info">
              <div class="info-item">
                <div class="info-icon">📍</div>
                <div class="info-content">
                  <h3>Address</h3>
                  <p>123 Art Gallery Street<br>Creative District<br>New York, NY 10001</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">📞</div>
                <div class="info-content">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">✉️</div>
                <div class="info-content">
                  <h3>Email</h3>
                  <p>info&#64;artgallery.com</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">🕒</div>
                <div class="info-content">
                  <h3>Hours</h3>
                  <p>Monday - Friday: 10:00 AM - 6:00 PM<br>Saturday: 11:00 AM - 7:00 PM<br>Sunday: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-section">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section class="map-section">
        <h2 class="section-title">Find Us</h2>
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-content">
              <span class="map-icon">🗺️</span>
              <p>Interactive Map</p>
              <small>123 Art Gallery Street, Creative District, NY 10001</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 100vh;
    }
    
    .contact-hero {
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
    
    .contact-content {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 2rem;
    }
    
    .contact-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: #6366f1;
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    .submit-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 100%;
    }
    
    .submit-btn:hover:not(:disabled) {
      background: #4f46e5;
    }
    
    .submit-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    
    .contact-info {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .info-icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      border-radius: 50%;
    }
    
    .info-content h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 0.5rem;
    }
    
    .info-content p {
      color: #6b7280;
      line-height: 1.6;
    }
    
    .social-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }
    
    .social-section h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 1rem;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .social-link {
      color: #6366f1;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid #6366f1;
      border-radius: 6px;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: #6366f1;
      color: white;
    }
    
    .map-section {
      padding: 4rem 2rem;
      background: #f8fafc;
    }
    
    .map-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .map-placeholder {
      height: 400px;
      background: #e5e7eb;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px dashed #9ca3af;
    }
    
    .map-content {
      text-align: center;
      color: #6b7280;
    }
    
    .map-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }
    
    .map-content p {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .map-content small {
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .contact-content {
        padding: 2rem 1rem;
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
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.formData = { name: '', email: '', subject: '', message: '' };
      this.isSubmitting = false;
    }, 2000);
  }
}
