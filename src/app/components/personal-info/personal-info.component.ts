// src/app/components/personal-info/personal-info.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard'; // ✅ new import
import { ResumeService } from '../../services/resume.service';
import { fadeInUp, zoomOnHover } from '../../animations/animations';
import { AppSettings } from '../../config/app-settings';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
  animations: [fadeInUp, zoomOnHover],
})
export class PersonalInfoComponent implements OnInit {
  basicInfo: any;
  imagePath = AppSettings.IMAGE_FILE_PATH;
  hoverState = 'normal';
  copiedItem: string | null = null; // for feedback

  constructor(
    private resumeService: ResumeService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe({
      next: (data) => (this.basicInfo = data.Resume.BasicPersonalInformation),
      error: (err) => console.error('Error loading resume data:', err),
    });
  }

  copyToClipboard(value: string, field: string): void {
    this.clipboard.copy(value);
    this.copiedItem = field;
    setTimeout(() => (this.copiedItem = null), 2000); // reset message after 2s
  }
}
