import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FileModel } from '../../models/common.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'file-filter',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './file-filter.component.html',
  styleUrl: './file-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFilterComponent implements OnInit{
  @Input() files: FileModel[] = []; 
  @Output() onChanged = new EventEmitter<FileModel[]>();
  name = new FormControl('');

  constructor () {
  }

  ngOnInit(): void {
    this.name.valueChanges.pipe(untilDestroyed(this)).subscribe((item) => {
      this.files = this.filterChanged(this.files, item!)
      this.onChanged.emit(this.files);
    });
  }

  filterChanged(files: FileModel[], filterText?: string): FileModel[] {
    let filesForFilter = [...files];
    filesForFilter.forEach((file) => {
      file.isHide = file.name.toLowerCase().indexOf(filterText?.toLocaleLowerCase()!) < 0;
      if (file.children) {
        file.children = this.filterChanged(file.children ?? [], filterText);
        file.isOpen = true;
      }
    })
    return filesForFilter;
  }

  
}