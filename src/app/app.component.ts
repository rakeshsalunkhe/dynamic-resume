import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ObjectiveComponent } from './components/objective/objective.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    PersonalInfoComponent,
    ObjectiveComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    AdditionalInfoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showScrollTop = false;
  menuOpen = false;

  /** Detect scroll to toggle scroll-to-top button */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTop = scrollY > 200;
  }

  /** Close mobile menu on window resize (switch to desktop) */
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 768 && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  printResume() {
    window.dispatchEvent(new Event('expandAllSections'));
    setTimeout(() => window.print(), 600);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
