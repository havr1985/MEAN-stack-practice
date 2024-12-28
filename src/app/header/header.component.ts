import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatAnchor, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
