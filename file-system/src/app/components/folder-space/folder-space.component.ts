import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { FileModel, FileType } from '../../models/common.model';
import { FileDataService } from '../../services/file-data.service';

@Component({
  selector: 'folder-space',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './folder-space.component.html',
  styleUrl: './folder-space.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderSpaceComponent {
  

  @Input() set files(value: FileModel[]) {
    this._files = value;
    this.cdr.markForCheck();
  };
  
  @Input() parents: string[] = [];

  _files: FileModel[] = [];


  constructor (private cdr: ChangeDetectorRef, public router: Router, public service: FileDataService,) {
  }

  onClick(file: FileModel):void {
    if (!file.isOpen && this.isEmptyFolder(file)) {
      return;
    }
    this.navigateToRoute(file, this.parents);
    const isFolder = this.isFolder(file);
    this.service.fileSelected.next(file.isOpen && isFolder ? this.parents[this.parents.length-1] : file.name);
    if (isFolder) {
      file.isOpen = !file.isOpen;
    }
  }

  setParentListForChildren(file: FileModel) {
    return [...this.parents, file.name ];
  }

  isFolder(file: FileModel) {
    return file.type === FileType.Folder;
  }

  isEmptyFolder(file: FileModel) {
    return this.isFolder(file) && !file.children?.some((item) => !item.isHide)
  }

  private getRouter(parentsList: string[]) {
    return parentsList.reduce((prev, current)=> prev +'/'+ current, '') ;
  }

  private navigateToRoute(file: FileModel, pathList: string[]):void {
    if (this.isFolder(file)) {
      file.isOpen ? this.router.navigate([this.getRouter(pathList)]) : this.router.navigate([this.getRouter([...pathList, file.name])]);
    } else {
      this.router.navigate([...pathList, file.name]);
    }
  }
  
}