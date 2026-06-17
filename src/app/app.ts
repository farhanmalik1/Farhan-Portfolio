import { Component, signal, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('angular-portfolio');
  protected readonly isDarkMode = signal(false);

  // Typewriter logic
  private typewriterTimeoutId?: any;
  private readonly phrases = ['Bold Intent', 'Angular Systems', 'Modern UX', 'Vibrant Design'];
  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  protected readonly displayedText = signal('');

  // Scroll Progress logic
  protected readonly scrollProgress = signal(0);

  // Mobile Menu state
  protected readonly isMobileMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  @HostListener('window:scroll', [])
  protected onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      const percentage = (scrollTop / scrollHeight) * 100;
      this.scrollProgress.set(percentage);
    } else {
      this.scrollProgress.set(0);
    }
  }

  public ngOnInit(): void {
    this.startTypewriter();
    this.initializeTheme();
  }

  public ngOnDestroy(): void {
    if (this.typewriterTimeoutId) {
      clearTimeout(this.typewriterTimeoutId);
    }
  }

  private startTypewriter(): void {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const run = () => {
      const currentPhrase = this.phrases[this.currentPhraseIndex];

      if (this.isDeleting) {
        // Deleting text
        this.displayedText.set(currentPhrase.substring(0, this.currentCharIndex));
        this.currentCharIndex--;

        if (this.currentCharIndex < 0) {
          this.isDeleting = false;
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          this.currentCharIndex = 0;
          this.typewriterTimeoutId = setTimeout(run, 500); // pause before typing next
        } else {
          this.typewriterTimeoutId = setTimeout(run, deleteSpeed);
        }
      } else {
        // Typing text
        this.displayedText.set(currentPhrase.substring(0, this.currentCharIndex));
        this.currentCharIndex++;

        if (this.currentCharIndex > currentPhrase.length) {
          this.isDeleting = true;
          this.typewriterTimeoutId = setTimeout(run, pauseTime); // pause at full word
        } else {
          this.typewriterTimeoutId = setTimeout(run, typeSpeed);
        }
      }
    };

    run();
  }

  // Form states
  protected readonly contactName = signal('');
  protected readonly contactEmail = signal('');
  protected readonly contactMessage = signal('');
  protected readonly feedbackSuccess = signal(false);
  protected readonly feedbackError = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly formSubmitted = signal(false);

  // Portfolio items
  protected readonly projects = [
    { 
      title: 'RBCEL 360', 
      desc: 'An IPTV (Internet Protocol Television) service platform developed for Rogers Communications, designed to deliver a modern, scalable television experience. Developed responsive UI components using Angular, NgRx Store, Contentful, and Monorepos.', 
      tech: ['Angular', 'NgRx Store', 'Contentful', 'Monorepos', 'Jest'], 
      color: 'bg-accent-yellow'
    },
    { 
      title: 'Flite', 
      desc: 'Admin panel and website development for Flite Logistics. Responsible for implementing responsive user interfaces, collaborating with design and backend teams, and optimizing web performance.', 
      tech: ['Angular', 'NgRx', 'TypeScript', 'Docker', 'Django'], 
      color: 'bg-accent-purple'
    },
    { 
      title: 'Eighteen Smart Home Panel', 
      desc: 'A smart home control panel application for automation of lighting, temperature, and security systems in a $2B CDA-approved luxury housing project.', 
      tech: ['Angular', 'Bootstrap', 'Angular Material', 'TypeScript', 'SQL'], 
      color: 'bg-accent-green'
    },
    { 
      title: 'IN WMS', 
      desc: 'Warehouse Management System focused on warehouse tracking, logistics, and stock management. Translated requirements into responsive UI components.', 
      tech: ['Angular', 'PrimeNG', 'Bootstrap', 'TypeScript', 'MongoDB'], 
      color: 'bg-accent-blue'
    },
    { 
      title: 'WorkExcellence', 
      desc: 'A custom-made workforce management system designed to optimize workforce efficiency, improve communication, and maximize productivity.', 
      tech: ['Angular', 'PrimeNG', 'TypeScript', 'RESTful APIs', 'SQL'], 
      color: 'bg-accent-orange'
    }
  ];

  protected toggleDarkMode(): void {
    this.isDarkMode.update(dark => !dark);
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('portfolio-theme', 'dark');
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('portfolio-theme', 'light');
      }
    }
  }

  private initializeTheme(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('portfolio-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      this.isDarkMode.set(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  protected handleFeedback(event: Event, form: any): void {
    event.preventDefault();
    this.formSubmitted.set(true);

    if (form.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.feedbackSuccess.set(false);
    this.feedbackError.set(false);

    fetch("https://formsubmit.co/ajax/farhanmalik12569@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.contactName(),
        email: this.contactEmail(),
        message: this.contactMessage(),
        _subject: `New Portfolio Message from ${this.contactName()}`
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      return response.json();
    })
    .then(data => {
      this.isSubmitting.set(false);
      this.feedbackSuccess.set(true);
      setTimeout(() => this.feedbackSuccess.set(false), 8000);
      form.resetForm();
      this.contactName.set('');
      this.contactEmail.set('');
      this.contactMessage.set('');
      this.formSubmitted.set(false);
    })
    .catch(error => {
      this.isSubmitting.set(false);
      this.feedbackError.set(true);
      setTimeout(() => this.feedbackError.set(false), 8000);
      console.error("FormSubmit Error:", error);
    });
  }
}

