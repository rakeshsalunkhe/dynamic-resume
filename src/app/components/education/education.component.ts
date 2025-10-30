import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResumeService } from '../../services/resume.service';
import { fadeInUp, zoomOnHover } from '../../animations/animations';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  animations: [fadeInUp,zoomOnHover]  
})
export class EducationComponent implements OnInit {
  educationList: any[] = [];
  hoverState = 'normal';
  isExpanded = false;
  private expandListener!: (event: Event) => void;
  private afterPrintListener!: () => void;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        const resume = data?.Resume || {};
        // ✅ Match exact key from your JSON
        this.educationList = resume.Education || [];
      },
      error: (err) => console.error('Error loading education data:', err)
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
