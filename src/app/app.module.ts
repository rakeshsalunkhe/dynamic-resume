import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatExpansionModule } from '@angular/material/expansion';

// Import the standalone AppComponent
import { AppComponent } from './app.component';

// Import your standalone feature components
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';

@NgModule({
  // ❌ No declarations — standalone components handle that themselves
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,

    // ✅ Import the standalone components
    AppComponent,
    AdditionalInfoComponent
  ],
  //bootstrap: [AppComponent]
})
export class AppModule {}
