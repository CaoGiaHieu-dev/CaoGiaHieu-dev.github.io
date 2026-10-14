import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Translation } from './translation';

@Component({
  selector: 'app-mobile-nav',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Mobile Fixed Bottom Thumb-Navigation Anchor (Touch-First & Auto-highlighting) -->
    <nav
      class="block md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800/90 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.6)] pb-safe transition-colors duration-200"
      aria-label="Mobile Navigation"
    >
      <div class="grid grid-cols-4 items-center h-16 px-1">
        
        <!-- Tab 1: Packages -->
        <a
          href="#packages"
          (click)="setActiveSection('packages')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group relative"
          [class.text-indigo-600]="activeSection() === 'packages'"
          [class.dark:text-indigo-400]="activeSection() === 'packages'"
          [class.font-semibold]="activeSection() === 'packages'"
        >
          @if (activeSection() === 'packages') {
            <span class="absolute top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
          }
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">extension</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.packages }}
          </span>
        </a>

        <!-- Tab 2: Monorepo -->
        <a
          href="#architecture"
          (click)="setActiveSection('architecture')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group relative"
          [class.text-indigo-600]="activeSection() === 'architecture'"
          [class.dark:text-indigo-400]="activeSection() === 'architecture'"
          [class.font-semibold]="activeSection() === 'architecture'"
        >
          @if (activeSection() === 'architecture') {
            <span class="absolute top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
          }
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">account_tree</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.architecture }}
          </span>
        </a>

        <!-- Tab 3: Contributions -->
        <a
          href="#contributions"
          (click)="setActiveSection('contributions')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group relative"
          [class.text-indigo-600]="activeSection() === 'contributions'"
          [class.dark:text-indigo-400]="activeSection() === 'contributions'"
          [class.font-semibold]="activeSection() === 'contributions'"
        >
          @if (activeSection() === 'contributions') {
            <span class="absolute top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
          }
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">commit</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.contributions }}
          </span>
        </a>

        <!-- Tab 4: Contact -->
        <a
          href="#contact"
          (click)="setActiveSection('contact')"
          class="flex flex-col items-center justify-center min-h-[48px] py-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group relative"
          [class.text-indigo-600]="activeSection() === 'contact'"
          [class.dark:text-indigo-400]="activeSection() === 'contact'"
          [class.font-semibold]="activeSection() === 'contact'"
        >
          @if (activeSection() === 'contact') {
            <span class="absolute top-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-500"></span>
          }
          <mat-icon class="text-xl leading-none transition-transform group-active:scale-95">mail</mat-icon>
          <span class="text-[10px] font-medium tracking-tight mt-1 truncate max-w-[70px]">
            {{ i18n.t().nav.contact }}
          </span>
        </a>

      </div>
    </nav>
  `
})
export class MobileNav implements OnDestroy {
  readonly i18n = inject(Translation);
  readonly activeSection = signal<string>('packages');

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.initSectionObserver();
    });
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  private initSectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = ['packages', 'architecture', 'contributions', 'contact'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach(el => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
