import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResumeService } from '../../services/resume.service';
import { fadeInUp, zoomOnHover } from '../../animations/animations';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [fadeInUp,zoomOnHover]  
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  hoverState = 'normal';
  isExpanded = false;
  private expandListener!: (event: Event) => void;
  private afterPrintListener!: () => void;
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        const resume = data?.Resume || {};
        // ✅ Handle both "Projects" and "projects" just in case
        this.projects = resume.Projects || resume.projects || [];
        console.log('Loaded Projects:', this.projects);
      },
      error: (err) => console.error('Error loading projects:', err)
    });

    this.expandListener = () => {
      this.isExpanded = true;
    };
    window.addEventListener('expandAllSections', this.expandListener);

    // Collapse back after print
    this.afterPrintListener = () => {
      this.isExpanded = false;
    };
    window.addEventListener('afterprint', this.afterPrintListener);
  }

  ngOnDestroy() {
    window.removeEventListener('expandAllSections', this.expandListener);
    window.removeEventListener('afterprint', this.afterPrintListener);
  }
}
