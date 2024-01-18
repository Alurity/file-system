import { Routes, UrlSegment } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { matcher: (url) => {
       return {consumed: url}
      }, component: HomeComponent },
];
