import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PostCreateComponent,
    HeaderComponent,
    PostsListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MEAN-stack-practice';
}
