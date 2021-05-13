import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PianoComponent } from './piano/piano.component';
import { PadComponent } from './pad/pad.component';


@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    PadComponent

    ],
  imports: [
    BrowserModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
