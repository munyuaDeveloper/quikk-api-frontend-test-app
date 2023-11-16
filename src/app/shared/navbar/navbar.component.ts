import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public authService: AuthService,
    private sharedService: SharedService,
    private router: Router) {

  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/'])
  }

  setAuthAction(action: string) {
    this.sharedService.setAuthAction(action)
  }
}
