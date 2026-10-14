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
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/75 dark:bg-[#08090d]/80 border-b border-slate-200/80 dark:border-white/[0.06] transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
        
        <!-- Zone 1: Brand Wordmark & Active Status Radar -->
        <a href="#" class="flex items-center gap-3 whitespace-nowrap shrink-0 group min-h-[44px]">
          <div class="relative">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs font-mono shadow-sm group-hover:scale-105 transition-transform duration-200">
              GH
            </div>
            <!-- Radar ping dot indicating active availability -->
            <span class="absolute -top-1 -right-1 flex h-3 w-3">
              <span class="radar-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#08090d]"></span>
            </span>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                {{ data.profile.name }}
              </span>
              <span class="hidden lg:inline-flex items-center text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                Verified
              </span>
            </div>
            <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
              {{ data.profile.title }}
            </span>
          </div>
        </a>

        <!-- Zone 2: Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono whitespace-nowrap">
          <a
            href="#packages"
            [class]="'transition-colors py-2 px-1 relative ' + navLinkClass('packages')"
          >
            {{ i18n.t().nav.packages }}
            @if (activeSection() === 'packages') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
          <a
            href="#architecture"
            [class]="'transition-colors py-2 px-1 relative ' + navLinkClass('architecture')"
          >
            {{ i18n.t().nav.architecture }}
            @if (activeSection() === 'architecture') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
          <a
            href="#contributions"
            [class]="'transition-colors py-2 px-1 relative ' + navLinkClass('contributions')"
          >
            {{ i18n.t().nav.contributions }}
            @if (activeSection() === 'contributions') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
          <a
            href="#contact"
            [class]="'transition-colors py-2 px-1 relative ' + navLinkClass('contact')"
          >
            {{ i18n.t().nav.contact }}
            @if (activeSection() === 'contact') {
              <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
            }
          </a>
        </nav>

        <!-- Zone 3: Actions (Theme Toggle, Language Switcher, GitHub) -->
        <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          <!-- Theme Toggle with micro-interaction -->
          <button
            type="button"
            (click)="theme.toggle()"
            [title]="theme.isDark() ? i18n.t().theme.switchToLight : i18n.t().theme.switchToDark"
            class="h-9 w-9 sm:h-8 sm:w-8 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
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
            class="h-9 sm:h-8 px-2.5 rounded-xl flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-200/90 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-medium transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            [title]="i18n.lang() === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
            [attr.aria-label]="i18n.lang() === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'"
          >
            <mat-icon class="text-xs text-slate-500 dark:text-slate-400 leading-none">translate</mat-icon>
            <span class="font-bold tracking-wider">{{ i18n.lang().toUpperCase() }}</span>
          </button>

          <!-- GitHub Direct Link -->
          <a
            [href]="data.profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 min-h-[32px] rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] border border-transparent dark:border-white/[0.08] text-white text-xs font-mono transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <mat-icon class="text-xs leading-none text-sky-400">code</mat-icon>
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

  navLinkClass(section: string): string {
    return this.activeSection() === section
      ? 'text-sky-600 dark:text-sky-400 font-semibold'
      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium';
  }
}
