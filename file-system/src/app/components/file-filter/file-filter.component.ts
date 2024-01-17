import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'file-filter',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './file-filter.component.html',
  styleUrl: './file-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFilterComponent implements OnInit{

  @Output() onChanged = new EventEmitter<string | null>();
  name = new FormControl('');

  constructor () {
  }

  ngOnInit(): void {
    this.name.valueChanges.subscribe((item) => {
      this.onChanged.emit(item);
    });
  }

  
}