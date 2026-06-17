import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { MarqueeComponent } from './components/marquee/marquee';
import { ProjectsComponent } from './components/projects/projects';
import { ExperienceComponent } from './components/experience/experience';
import { SkillsComponent } from './components/skills/skills';
import { EducationComponent } from './components/education/education';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    MarqueeComponent,
    ProjectsComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);

  public ngOnInit(): void {
    this.themeService.initializeTheme();
  }
}

