import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [FormsModule],
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
  ],
  standalone: true
})
export class ContactComponent {
  // Form states
  protected readonly contactName = signal('');
  protected readonly contactEmail = signal('');
  protected readonly contactMessage = signal('');
  protected readonly feedbackSuccess = signal(false);
  protected readonly feedbackError = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly formSubmitted = signal(false);

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
