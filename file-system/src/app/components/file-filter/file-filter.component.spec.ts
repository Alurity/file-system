import { TestBed } from '@angular/core/testing';
import { FileFilterComponent } from './file-filter.component';
import { FileType } from '../../models/common.model';

describe('FileFilterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileFilterComponent],
    }).compileComponents();
  });

  it('should create the file filter', () => {
    const fixture = TestBed.createComponent(FileFilterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should filter file list by filter string', () => {
    const fixture = TestBed.createComponent(FileFilterComponent);
    const app = fixture.componentInstance;
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

    const resultFiles = app.filterChanged(mockfiles, '1');

    expect(resultFiles[0].isHide).toBeFalse;
    expect(resultFiles[1].isHide).toBeTrue;
  });

  it('should filter file list after change the value of name field', () => {
    const fixture = TestBed.createComponent(FileFilterComponent);
    const app = fixture.componentInstance;
    app.files = [{
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

    spyOn(app, 'filterChanged');
    fixture.detectChanges();
    app.name.setValue('1');
    expect(app.filterChanged).toHaveBeenCalled();
  });
  
});