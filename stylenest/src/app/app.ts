import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  Footer,FormsModule],
  templateUrl: './app.html',
})
export class AppComponent {}
