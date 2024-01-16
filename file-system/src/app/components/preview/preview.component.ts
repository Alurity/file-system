import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'preview',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PreviewComponent implements OnInit{
  
  constructor () {

  }
  ngOnInit(): void {
  }
  
}
