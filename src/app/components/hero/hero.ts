import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  standalone: true
})
export class HeroComponent implements OnInit, OnDestroy {
  // Typewriter logic
  private typewriterTimeoutId?: any;
  private readonly phrases = ['Bold Intent', 'Angular Systems', 'Modern UX', 'Vibrant Design'];
  private currentPhraseIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  protected readonly displayedText = signal('');

  public ngOnInit(): void {
    this.startTypewriter();
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
}
