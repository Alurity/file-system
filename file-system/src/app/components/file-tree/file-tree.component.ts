import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FolderSpaceComponent } from '../folder-space/folder-space.component';
import { FileDataService } from '../../services/file-data.service';
import { FileModel } from '../../models/common.model';
import { FileFilterComponent } from '../file-filter/file-filter.component';
import { filter, merge, takeLast, zip } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'file-tree',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FolderSpaceComponent, FileFilterComponent],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeComponent implements OnInit{
  files: FileModel[] = [];

  @Input() url: string | null = null;

  constructor (public service: FileDataService, private cd: ChangeDetectorRef,  private router: Router, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.service.getFiles()
    .pipe(untilDestroyed(this))
    .subscribe((result)=> {
      const usedUrl = this.url ? this.url : this.router.url;
      const pathList = usedUrl.split('/').filter((item) => item);
      this.service.fileSelected.next(pathList[pathList.length - 1]);
      this.files = this.setFileOpenStatysByPath(pathList, result);
      this.cd.markForCheck();
    });
  }

  setFileOpenStatysByPath(path: string[], fileList: FileModel[]):FileModel[] {
    const fileIndex = fileList.findIndex((item) => item.name.toLowerCase() === path[0]?.toLowerCase());
    if (fileIndex >= 0) {
      let file = fileList[fileIndex];
      file.isOpen = true;
      path.shift();
      if (file.children) {
        file.children = this.setFileOpenStatysByPath(path, file.children);
      }
      fileList[fileIndex] = file;
    }
    return fileList;
  }

  getFocusedFileName(path: string[], files: FileModel[], index?: number): string {
    let fileList = [...files];
    let pathList = [...path];
    
    let result = pathList[0];
    const i = files.findIndex((item) => item.name.toLowerCase() === pathList[index ?? 0]?.toLowerCase());
    if (i >= 0) { 
      let file = fileList[i];
      pathList.shift();
      result = this.getFocusedFileName(pathList, file.children ?? []);
    }
    return result;
  }

  public onFilterChanged(filteredFileList: FileModel[]) {
    this.files = filteredFileList;
    this.cd.markForCheck();
  }
  
  
}