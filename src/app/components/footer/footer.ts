import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  standalone: true
})
export class FooterComponent {
  protected readonly themeService = inject(ThemeService);
}
