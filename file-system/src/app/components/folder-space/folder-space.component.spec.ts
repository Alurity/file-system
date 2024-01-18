import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FolderSpaceComponent } from './folder-space.component';
import { FileType } from '../../models/common.model';

describe('FolderSpaceComponent', () => {
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
    await TestBed.configureTestingModule({
      imports: [FolderSpaceComponent, HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(FolderSpaceComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should change url after click', () => {
    const fixture = TestBed.createComponent(FolderSpaceComponent);
    const app = fixture.componentInstance;
    app.files = mockfiles;
    fixture.detectChanges();

    spyOn(app.router, 'navigate');
    const folder = fixture.nativeElement.querySelector('.folder_container');
    folder.click();
    fixture.detectChanges();
    expect(app.router.navigate).toHaveBeenCalled();
  });
});
