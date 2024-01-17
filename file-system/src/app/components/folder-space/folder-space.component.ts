import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { FileModel } from '../../models/common.model';

@Component({
  selector: 'folder-space',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './folder-space.component.html',
  styleUrl: './folder-space.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderSpaceComponent implements OnInit, OnChanges{
  

  @Input() set files(value: FileModel[]) {
    this._files = value;
    this.cdr.markForCheck();
  }

  _files: FileModel[] = [];


  constructor (private cdr: ChangeDetectorRef, public router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
  }

  onSelectFile(file: FileModel): void {
    console.log(file);
  }

  onClick(file: FileModel):void {
    if (!file.isOpen && file.children?.every((item) => item.isHide)) {
      return;
    }
    this.router.navigate([file.name]);
    file.isOpen = !file.isOpen;
  }
  
}