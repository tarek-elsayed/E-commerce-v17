import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
bootstrapApplication(AppComponent,{
  providers: [
    provideAnimations(),
    importProvidersFrom(MenubarModule)
  ]
})
  .catch((err) => console.error(err));
