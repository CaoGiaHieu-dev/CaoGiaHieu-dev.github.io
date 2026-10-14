import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from './header';
import { Hero } from './hero';
import { Packages } from './packages';
import { Architecture } from './architecture';
import { Contributions } from './contributions';
import { Contact } from './contact';
import { Footer } from './footer';
import { MobileNav } from './mobile-nav';
import { Theme } from './theme';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Packages,
    Architecture,
    Contributions,
    Contact,
    Footer,
    MobileNav,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500/20 dark:selection:bg-indigo-500/30 selection:text-indigo-800 dark:selection:text-indigo-200 transition-colors duration-200">
      <app-header></app-header>
      <main class="flex-1">
        <app-hero></app-hero>
        <app-packages></app-packages>
        <app-architecture></app-architecture>
        <app-contributions></app-contributions>
        <app-contact></app-contact>
      </main>
      <app-footer></app-footer>
      <app-mobile-nav></app-mobile-nav>
    </div>
  `
})
export class App {
  // Ensure Theme service is initialized
  readonly theme = inject(Theme);
}
