import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostModel } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-posts-list',
  imports: [MatExpansionModule, MatButton],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: PostModel[] = [];
  private postsSub: Subscription | undefined;
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
      });
  }
  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }
}
