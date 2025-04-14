import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  logoPath = '/login/SBSCLogo.png';
  arrowPath = '/login/arrow.svg';
  title = 'frontend';

  constructor(private router: Router) {}

  // Render the page contionally based on the URL
  get isRootRoute(): boolean {
    return this.router.url === '/';
  }
}
