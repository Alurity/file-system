import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
});
