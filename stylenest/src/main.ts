import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter , withRouterConfig} from '@angular/router';
import { provideHttpClient ,withFetch} from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes,withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(withFetch())
  ]
});
