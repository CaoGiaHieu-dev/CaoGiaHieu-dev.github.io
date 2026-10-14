import { Injectable, computed, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  readonly mode = signal<ThemeMode>('dark');
  readonly isDark = computed(() => this.mode() === 'dark');
  readonly isLight = computed(() => this.mode() === 'light');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('portfolio-theme') as ThemeMode | null;
      if (stored === 'light' || stored === 'dark') {
        this.applyTheme(stored);
        return;
      }

      // Check system preference if no stored user preference
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      const initialMode: ThemeMode = prefersLight ? 'light' : 'dark';
      this.applyTheme(initialMode);
    } catch {
      this.applyTheme('dark');
    }
  }

  toggle(): void {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(newTheme: ThemeMode): void {
    this.applyTheme(newTheme);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('portfolio-theme', newTheme);
      } catch {
        // Storage might be blocked or full in private mode
      }
    }
  }

  private applyTheme(newTheme: ThemeMode): void {
    this.mode.set(newTheme);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }

      // Dynamically update mobile browser chrome/status bar color
      const metaTheme = document.getElementById('theme-color-meta');
      if (metaTheme) {
        metaTheme.setAttribute('content', newTheme === 'dark' ? '#07090e' : '#f8fafc');
      }
    }
  }
}
