import { Component, signal, HostListener, inject, effect } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate('200ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateY(-10px)', opacity: 0 }))
      ])
    ])
  ],
  standalone: true
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
  
  constructor() {
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.isMobileMenuOpen()) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  }

  // Mobile Menu state
  protected readonly isMobileMenuOpen = signal(false);

  // Scroll Progress logic
  protected readonly scrollProgress = signal(0);

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  @HostListener('window:scroll', [])
  protected onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const percentage = (scrollTop / scrollHeight) * 100;
        this.scrollProgress.set(percentage);
      } else {
        this.scrollProgress.set(0);
      }
    }
  }
}
