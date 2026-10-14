import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioData } from './portfolio-data';
import { Translation } from './translation';
import { Theme } from './theme';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#090b10]/85 border-b border-slate-200/80 dark:border-white/[0.08] transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
        
        <!-- Zone 1: Brand Wordmark -->
        <a href="#" class="flex items-center gap-2.5 whitespace-nowrap shrink-0 group min-h-[44px]">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-600 to-blue-600 flex items-center justify-center font-bold text-white text-xs font-mono shadow-sm group-hover:scale-105 transition-transform">
            GH
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
              {{ data.profile.name }}
            </span>
            <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
              {{ data.profile.title }}
            </span>
          </div>
        </a>

        <!-- Zone 2: Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
          <a
            href="#packages"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-sky-600]="activeSection() === 'packages'"
            [class.dark:text-sky-400]="activeSection() === 'packages'"
            [class.font-semibold]="activeSection() === 'packages'"
          >
            {{ i18n.t().nav.packages }}
            @if (activeSection() === 'packages') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
          <a
            href="#architecture"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-sky-600]="activeSection() === 'architecture'"
            [class.dark:text-sky-400]="activeSection() === 'architecture'"
            [class.font-semibold]="activeSection() === 'architecture'"
          >
            {{ i18n.t().nav.architecture }}
            @if (activeSection() === 'architecture') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
          <a
            href="#contributions"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-sky-600]="activeSection() === 'contributions'"
            [class.dark:text-sky-400]="activeSection() === 'contributions'"
            [class.font-semibold]="activeSection() === 'contributions'"
          >
            {{ i18n.t().nav.contributions }}
            @if (activeSection() === 'contributions') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
          <a
            href="#contact"
            class="hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 relative"
            [class.text-sky-600]="activeSection() === 'contact'"
            [class.dark:text-sky-400]="activeSection() === 'contact'"
            [class.font-semibold]="activeSection() === 'contact'"
          >
            {{ i18n.t().nav.contact }}
            @if (activeSection() === 'contact') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
        </nav>

        <!-- Zone 3: Actions -->
        <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          <!-- Theme Toggle -->
          <button
            type="button"
            (click)="theme.toggle()"
            [title]="theme.isDark() ? i18n.t().theme.switchToLight : i18n.t().theme.switchToDark"
            class="h-9 w-9 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0 shadow-xs"
            [attr.aria-label]="theme.isDark() ? i18n.t().theme.switchToLight : i18n.t().theme.switchToDark"
          >
            @if (theme.isDark()) {
              <mat-icon class="text-base text-amber-400 leading-none">light_mode</mat-icon>
            } @else {
              <mat-icon class="text-base text-sky-600 leading-none">dark_mode</mat-icon>
            }
          </button>

          <!-- Language Switcher -->
          <button
            type="button"
            (click)="toggleLanguage()"
            class="h-9 sm:h-8 px-2.5 rounded-lg flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 shadow-xs"
            [title]="i18n.lang() === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
            [attr.aria-label]="i18n.lang() === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
          >
            <mat-icon class="text-xs text-slate-500 dark:text-slate-400 leading-none">translate</mat-icon>
            <span class="font-bold">{{ i18n.lang().toUpperCase() }}</span>
          </button>

          <!-- GitHub Direct Link -->
          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 min-h-[32px] rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white/[0.1] dark:hover:bg-white/[0.15] border border-transparent dark:border-white/[0.1] text-white text-xs font-medium font-mono transition-colors shadow-xs"
          >
            <mat-icon class="text-xs leading-none">code</mat-icon>
            <span>GitHub</span>
          </a>

        </div>

      </div>
    </header>
  `
})
export class Header implements OnDestroy {
  readonly data = inject(PortfolioData);
  readonly i18n = inject(Translation);
  readonly theme = inject(Theme);
  readonly activeSection = signal<string>('packages');

  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.initScrollSpy();
    });
  }

  toggleLanguage(): void {
    const nextLang = this.i18n.lang() === 'vi' ? 'en' : 'vi';
    this.i18n.setLang(nextLang);
  }

  private initScrollSpy(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sectionIds = ['packages', 'architecture', 'contributions', 'contact'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
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
