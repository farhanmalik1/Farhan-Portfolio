import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-portfolio');
  protected readonly isDarkMode = signal(false);

  // Form states
  protected readonly contactName = signal('');
  protected readonly contactEmail = signal('');
  protected readonly contactMessage = signal('');
  protected readonly feedbackSuccess = signal(false);
  protected readonly feedbackError = signal(false);
  protected readonly isSubmitting = signal(false);

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
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  protected handleFeedback(event: Event): void {
    event.preventDefault();
    if (this.contactName() && this.contactEmail() && this.contactMessage()) {
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
        this.contactName.set('');
        this.contactEmail.set('');
        this.contactMessage.set('');
      })
      .catch(error => {
        this.isSubmitting.set(false);
        this.feedbackError.set(true);
        setTimeout(() => this.feedbackError.set(false), 8000);
        console.error("FormSubmit Error:", error);
      });
    }
  }
}

