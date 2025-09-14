import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'artwork/:id',
    loadComponent: () => import('./components/artwork-detail/artwork-detail.component').then(m => m.ArtworkDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'artists',
    loadComponent: () => import('./components/artists/artists.component').then(m => m.ArtistsComponent)
  },
  {
    path: 'exhibitions',
    loadComponent: () => import('./components/exhibitions/exhibitions.component').then(m => m.ExhibitionsComponent)
  },
  {
    path: 'news',
    loadComponent: () => import('./components/news/news.component').then(m => m.NewsComponent)
  },
  {
    path: 'saved',
    loadComponent: () => import('./components/saved/saved.component').then(m => m.SavedComponent)
  },
  {
    path: 'artwork-detail/:id',
    loadComponent: () => import('./components/artwork-view-detail/artwork-view-detail.component').then(m => m.ArtworkViewDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
