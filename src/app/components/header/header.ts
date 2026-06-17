import { Component, signal, HostListener, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
  
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
