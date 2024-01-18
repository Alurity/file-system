import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { FileModel } from '../../models/common.model';
import { FileDataService } from '../../services/file-data.service';
import { PreviewComponent } from '../preview/preview.component';
import { FileTreeComponent } from '../file-tree/file-tree.component';
import { filter } from 'rxjs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ PreviewComponent, FileTreeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent{

  @Input() url: string | null = null;

  constructor (private cdr: ChangeDetectorRef, public router: Router, public service: FileDataService, public route: ActivatedRoute) {
  }
}