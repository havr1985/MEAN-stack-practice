import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: PostModel[] = [];
  private postUpdated = new Subject<PostModel[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: PostModel = { title: title, content: content };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
