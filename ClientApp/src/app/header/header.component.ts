import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  isUser() {
    return this.authService.currentUser != null && this.authService.admin == false;
  }

  isAdmin() {
    return this.authService.admin;
  }


  redirectToMenu() {
    this.router.navigate(['/menu']);
  }

  logout() {
    this.authService.currentUser = undefined;
    this.authService.admin = false;

    
    this.router.navigate(['/menu']);
  }
}
