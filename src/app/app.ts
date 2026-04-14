import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatMenuModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TaskManagerFrontEnd');
  public Links = [
    {
      DisplayName : "Login", Path : "/login"
    },
    {
      DisplayName : "Sign Up", Path : "/signup"
    },
    {
      DisplayName : "Home", Path : "/home"
    }
  ];
}
