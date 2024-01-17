import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FolderSpaceComponent } from '../folder-space/folder-space.component';
import { FileDataService } from '../../services/file-data.service';
import { FileModel } from '../../models/common.model';
import { FileFilterComponent } from '../file-filter/file-filter.component';
import { filter, takeLast } from 'rxjs';


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

  constructor (public service: FileDataService, private cd: ChangeDetectorRef,  private router: Router) {

  }
  ngOnInit(): void {
    this.service.getFiles().subscribe((result)=> {
      this.files = result;
      
      this.cd.markForCheck();
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => console.log((event as NavigationEnd).url));
  }

  public onFilterChanged(filterText: string) {
    this.files = this.filterChanged(this.files, filterText);
    this.cd.markForCheck();
  }

  filterChanged(filesForFilter: FileModel[], filterText?: string): FileModel[] {
    let test = [...filesForFilter];
    test.forEach((file) => {
      file.isHide = file.name.indexOf(filterText!) < 0;
      file.isOpen = true;
      if (file.children) {
        file.children = this.filterChanged(file.children ?? [], filterText);
      }
    })
    return test;
  }
  
}