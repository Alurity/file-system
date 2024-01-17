import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
  selector: 'preview',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxDocViewerModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PreviewComponent implements OnInit{
  @ViewChild('frame') frame:ElementRef;
  
  constructor () {
    this.frame = new ElementRef(document.getElementsByClassName('frame'));
  }

  ngOnInit(): void {
    this.frame.nativeElement[0].src = "../../../assets/Documents/Level1-4.txt";
  }


  
}
