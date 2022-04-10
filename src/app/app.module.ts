import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PagesComponent } from './pages/pages.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { ApiInterceptor } from './shared/helpers/api.interceptor';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AsyncService } from './shared/services/async.service';
import { CommonService } from './shared/services/common.service';
import { AuthGuard } from './auth/auth.guard';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth/state/auth.state';
import { AsyncState } from './shared/state/async.state';
import { PlatformLocation } from '@angular/common';
import { UrlService } from './shared/services/url.service';
@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    SharedModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxsModule.forRoot([AuthState, AsyncState], {
      developmentMode: !environment.production,
    }),
    FlexLayoutModule,
    NgxsStoragePluginModule.forRoot(),
  ],
  providers: [
    AuthService,
    AsyncService,
    CommonService,
    UrlService,
    AuthGuard,
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    {
      provide: 'BASE_IMAGE_URL',
      useValue: environment.imageUrl,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation],
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
