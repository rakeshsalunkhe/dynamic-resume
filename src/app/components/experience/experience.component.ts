import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ResumeService } from '../../services/resume.service';
import { MatCardModule } from '@angular/material/card';
import { fadeInUp, zoomOnHover } from '../../animations/animations';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatCardModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  animations: [fadeInUp,zoomOnHover]  
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];
  hoverState = 'normal';
  isExpanded = false;
  private expandListener!: (event: Event) => void;
  private afterPrintListener!: () => void;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        // ✅ Matches JSON structure exactly
        this.experiences = data.Resume.Experience || [];
      },
      error: (err) => console.error('Error loading experience data:', err)
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
