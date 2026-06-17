import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  standalone: true
})
export class ProjectsComponent {
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
}
