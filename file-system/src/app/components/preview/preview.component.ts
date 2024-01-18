import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FileDataService } from '../../services/file-data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'preview',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxDocViewerModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PreviewComponent implements OnInit{
  name: string = 'Home';
  
  constructor (public service: FileDataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.service.fileSelected.pipe(untilDestroyed(this))
    .subscribe((fileName) => {
      this.name = fileName;
      this.cd.markForCheck();
    });
  }
  
}
