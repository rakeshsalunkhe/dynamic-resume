import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ResumeService } from '../../services/resume.service';
import { fadeInUp, zoomOnHover } from '../../animations/animations';  

@Component({
  selector: 'app-objective',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css'],
  animations: [fadeInUp,zoomOnHover]  
})
export class ObjectiveComponent implements OnInit {
  objective: string = '';
  hoverState = 'normal';
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => {
        // ✅ exact match to your JSON field
        this.objective = data.Resume.Objective;
      },
      error: (err) => console.error('Error loading resume data:', err)
    });
  }
}
