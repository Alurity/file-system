import { TestBed } from '@angular/core/testing';
import { FileType } from '../../models/common.model';
import { FileTreeComponent } from './file-tree.component';
import { FileDataService } from '../../services/file-data.service';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

describe('FileTreeComponent', () => {
  let mockFileDataService;
  const mockfiles = [{
    name: 'TestFile1',
    isHide: false,
    type: FileType.Folder,
    children: [
        {
            name: 'TestFile1-1',
            isHide: false,
            type: FileType.File
        }
    ]
},
{
    name: 'TestFile2',
    isHide: false,
    type: FileType.File
}] 
  beforeEach(async () => {
    mockFileDataService = jasmine.createSpyObj(['getFiles', 'fileSelected', 'urlPasted']);
    mockFileDataService.getFiles.and.returnValue(of(mockfiles));
    mockFileDataService.fileSelected.and.returnValue(new BehaviorSubject(''));
    await TestBed.configureTestingModule({
      imports: [FileTreeComponent],
      providers: [ {provide: FileDataService, useValue: mockFileDataService} , ChangeDetectorRef, Router]
    }).compileComponents();
  });

  it('should create the file filter', () => {
    const fixture = TestBed.createComponent(FileTreeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set the setting of the open file ', () => {
    const fixture = TestBed.createComponent(FileTreeComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'setFileOpenStatysByPath');
    fixture.detectChanges();
    expect(app.setFileOpenStatysByPath).toHaveBeenCalled();
  });
  
});