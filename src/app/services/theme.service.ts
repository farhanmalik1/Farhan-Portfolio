import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public readonly isDarkMode = signal(false);

  public initializeTheme(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('portfolio-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      this.isDarkMode.set(shouldBeDark);
      this.updateBodyClass(shouldBeDark);
    }
  }

  public toggleDarkMode(): void {
    this.isDarkMode.update(dark => !dark);
    const dark = this.isDarkMode();
    this.updateBodyClass(dark);
    
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
    }
  }

  private updateBodyClass(dark: boolean): void {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
