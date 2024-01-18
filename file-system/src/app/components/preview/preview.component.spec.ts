import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PreviewComponent } from './preview.component';
import { of } from 'rxjs';
import { FileDataService } from '../../services/file-data.service';

describe('PreviewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewComponent, HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PreviewComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

});
