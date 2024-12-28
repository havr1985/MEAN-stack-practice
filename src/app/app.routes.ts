import { Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

export const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },
];
