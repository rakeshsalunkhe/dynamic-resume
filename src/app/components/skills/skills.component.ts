import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../services/resume.service';
import { fadeInUp, zoomOnHover } from '../../animations/animations';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [fadeInUp,zoomOnHover]  
})
export class SkillsComponent implements OnInit {
  skills: string[] = [];
  hoverState = 'normal';
  isExpanded = false;
  private expandListener!: (event: Event) => void;
  private afterPrintListener!: () => void;
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        // ✅ matches your JSON structure
        this.skills = data.Resume.Skills || [];
      },
      error: (err) => console.error('Error loading skills:', err)
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
