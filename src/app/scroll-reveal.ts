import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  afterNextRender,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  
  /** Delay in milliseconds before triggering the animation after entering the viewport */
  readonly delay = input<number>(0);

  /** Distance in pixels (or CSS unit) for slide-up effect, default 28px */
  readonly distance = input<string>('28px');

  /** Duration of transition in ms, default 650ms */
  readonly duration = input<number>(650);

  /** IntersectionObserver threshold from 0 to 1, default 0.12 */
  readonly threshold = input<number>(0.1);

  /** Optional root margin, default bottom offset -40px for natural viewport scroll trigger */
  readonly rootMargin = input<string>('0px 0px -40px 0px');

  private observer?: IntersectionObserver;
  private timeoutId?: number;

  constructor() {
    afterNextRender(() => {
      this.initReveal();
    });
  }

  private initReveal(): void {
    const element = this.el.nativeElement;
    if (!element || typeof window === 'undefined') return;

    // Respect user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Set initial concealed state
    element.style.opacity = '0';
    element.style.transform = `translateY(${this.distance()})`;
    element.style.transition = `opacity ${this.duration()}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${this.duration()}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    element.style.willChange = 'opacity, transform';

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const delayMs = this.delay();
            if (delayMs > 0) {
              this.timeoutId = window.setTimeout(() => {
                this.reveal(element);
              }, delayMs);
            } else {
              requestAnimationFrame(() => {
                this.reveal(element);
              });
            }
            this.observer?.unobserve(element);
          }
        }
      },
      {
        threshold: this.threshold(),
        rootMargin: this.rootMargin(),
      }
    );

    this.observer.observe(element);
  }

  private reveal(element: HTMLElement): void {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Clear will-change after transition ends to optimize memory
    window.setTimeout(() => {
      element.style.willChange = 'auto';
    }, this.duration() + 50);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
