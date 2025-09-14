# Art Gallery - Angular Animated Website

A beautiful, modern art gallery website built with Angular 17, featuring smooth animations, responsive design, and an intuitive user interface for browsing and discovering artworks.

## Features

- 🎨 **Modern Gallery Interface** - Clean, responsive grid layout for displaying artworks
- ✨ **Smooth Animations** - Angular Animations API for engaging user interactions
- 🔍 **Advanced Filtering** - Search, filter by category, price range, year, and more
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🖼️ **Artwork Details** - Detailed view with high-quality images and information
- 🎯 **Interactive Elements** - Hover effects, transitions, and micro-interactions
- 🚀 **Performance Optimized** - Lazy loading, efficient rendering, and smooth scrolling

## Technology Stack

- **Angular 17** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with custom properties
- **Angular Animations** - Smooth transitions and animations
- **RxJS** - Reactive programming for data management

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd art-gallery-angular
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── gallery/           # Main gallery component
│   │   ├── artwork-card/      # Individual artwork card
│   │   ├── artwork-detail/    # Detailed artwork view
│   │   ├── gallery-filter/    # Filtering interface
│   │   ├── header/           # Navigation header
│   │   ├── footer/           # Site footer
│   │   └── about/            # About page
│   ├── models/
│   │   └── artwork.model.ts   # TypeScript interfaces
│   ├── services/
│   │   └── artwork.service.ts # Data management service
│   ├── app.component.ts       # Root component
│   ├── app.routes.ts          # Routing configuration
│   └── main.ts               # Application bootstrap
├── styles/
│   └── globals.scss          # Global styles
└── index.html               # Main HTML file
```

## Key Components

### Gallery Component
- Displays artworks in a responsive grid
- Implements filtering and search functionality
- Features smooth animations and transitions

### Artwork Card Component
- Individual artwork display with hover effects
- Quick actions (favorite, share, view details)
- Responsive design for all screen sizes

### Artwork Detail Component
- Full-screen artwork view with high-resolution images
- Detailed information and metadata
- Related artworks suggestions

### Gallery Filter Component
- Advanced filtering options
- Real-time search functionality
- Active filter display and management

## Animations

The application uses Angular's built-in animation system for:

- **Page Transitions** - Smooth fade and slide effects
- **Card Interactions** - Hover effects and micro-animations
- **Loading States** - Elegant loading indicators
- **Filter Changes** - Animated filter updates
- **Image Loading** - Progressive image reveal

## Customization

### Adding New Artwork Categories
1. Update the `ArtworkCategory` interface in `artwork.model.ts`
2. Add new categories to the service in `artwork.service.ts`
3. Update the filter component to include new categories

### Styling
- Global styles are in `src/styles.scss`
- Component-specific styles use Angular's scoped styling
- CSS custom properties for consistent theming

### Adding New Features
- Create new components in the `components/` directory
- Add routes in `app.routes.ts`
- Update the navigation in the header component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Lazy loading for route components
- Optimized images with proper sizing
- Efficient change detection strategies
- Minimal bundle size with tree shaking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Unsplash for providing beautiful sample images
- Angular team for the excellent framework
- The open-source community for inspiration and tools
