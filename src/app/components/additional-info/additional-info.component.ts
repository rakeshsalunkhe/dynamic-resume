import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResumeService } from '../../services/resume.service';
import { fadeInUp, zoomOnHover } from '../../animations/animations';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css'],
  animations: [fadeInUp,zoomOnHover]  
})
export class AdditionalInfoComponent implements OnInit {
  additionalInfo: any = {};
  hoverState = 'normal';
  isExpanded = false;
  private expandListener!: (event: Event) => void;
  private afterPrintListener!: () => void;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        const resume = data?.Resume || {};
        
        this.additionalInfo = resume.additionalInfo || {};
      },
      error: (err) => console.error('Error loading additional info:', err)
    });

    this.expandListener = () => (this.isExpanded = true);
    window.addEventListener('expandAllSections', this.expandListener);

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
