import { Component, HostListener, inject } from '@angular/core';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ObjectiveComponent } from './components/objective/objective.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    AdditionalInfoComponent
  ],
  template: `
    <mat-toolbar color="transparent" class="sticky-toolbar" role="navigation">
      <div style="display:flex;gap:8px;align-items:center;padding:6px;">
        <button mat-button (click)="scrollTo('personal')">Personal</button>
        <button mat-button (click)="scrollTo('objective')">Objective</button>
        <button mat-button (click)="scrollTo('skills')">Skills</button>
        <button mat-button (click)="scrollTo('experience')">Experience</button>
        <button mat-button (click)="scrollTo('projects')">Projects</button>
        <button mat-button (click)="scrollTo('education')">Education</button>
        <button mat-button (click)="scrollTo('additional')">More</button>
        <span style="flex:1"></span>
        <button mat-icon-button (click)="scrollToTop()" aria-label="Back to top">
          <mat-icon>arrow_upward</mat-icon>
        </button>

        <span class="spacer"></span>

        <!-- Print button inside navbar -->
        <button
          mat-icon-button
          color="accent"
          matTooltip="Print or Save as PDF"
          (click)="printResume()"
        >
          <mat-icon>print</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <app-personal-info></app-personal-info>
    <app-objective></app-objective>
    <app-skills></app-skills>
    <app-experience></app-experience>
    <app-projects></app-projects>
    <app-education></app-education>
    <app-additional-info></app-additional-info>

    <!-- Scroll-to-top button
<button
  class="scroll-top"
  mat-fab
  color="primary"
  [class.visible]="showTop"
  (click)="scrollToTop()"
>
  <mat-icon>keyboard_arrow_up</mat-icon>
</button> -->


  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showTop = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  this.showTop = window.pageYOffset > 300;
}

  constructor() {
    window.addEventListener('scroll', () => {
      this.showTop = window.scrollY > 300;
    });
  }

  scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // Adjust to match your toolbar height
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

 printResume() {
  // Dispatch a custom event that tells all sections to expand
  window.dispatchEvent(new Event('expandAllSections'));

  // Give time for Angular to render expanded views before printing
  setTimeout(() => {
    window.print();
  }, 600);
}

}
