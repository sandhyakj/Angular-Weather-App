import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { SidenavTogglerComponent } from './layout/sidenav-toggler/sidenav-toggler.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TopnavComponent } from './layout/topnav/topnav.component';
import { CustomPreloadService } from './services/custom-preload.service';
import {HttpClientModule} from '@angular/common/http';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SidenavTogglerComponent,
    SidenavComponent,
    TopnavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CustomPreloadService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
