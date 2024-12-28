import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-posts-list',
  imports: [
    MatExpansionModule,
    MatButton,
    MatAnchor,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: PostModel[] = [];
  isLoading = false;
  private postsSub: Subscription | undefined;
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: PostModel[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }
}
