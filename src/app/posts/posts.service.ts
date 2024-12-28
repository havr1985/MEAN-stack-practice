import { Injectable } from '@angular/core';
import { PostModel } from './post.model';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: PostModel[] = [];
  private postUpdated = new Subject<PostModel[]>();
  private baseUrl = 'http://localhost:3000/posts';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getPosts() {
    this.http
      .get<{ title: string; content: string; _id: string }[]>(this.baseUrl)
      .pipe(
        map(postData => {
          return postData.map(post => {
            console.log(post);
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.baseUrl}/${id}`);
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const addPost = { title: title, content: content };
    const post: PostModel = { id: '', title: title, content: content };
    this.http.post<{ _id: string }>(this.baseUrl, addPost).subscribe(data => {
      post.id = data._id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(post: PostModel) {
    const postUpdate = {
      _id: post.id,
      title: post.title,
      content: post.content,
    };
    this.http.put(this.baseUrl + '/' + post.id, postUpdate).subscribe(() => {
      const updatedPosts = [...this.posts];
      const oldPostIdx = updatedPosts.findIndex(post => post.id === post.id);
      updatedPosts[oldPostIdx] = post;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete(this.baseUrl + '/' + id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.postUpdated.next([...this.posts]);
    });
  }
}
