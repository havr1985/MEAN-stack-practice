import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { PostsService } from '../posts.service';
import { PostModel } from '../post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatButton,
    MatFormFieldModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {
  post!: PostModel;
  private mode = 'create';
  private postId!: string | null;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
    if (this.postId) {
      this.mode = 'edit';
      this.postsService.getPost(this.postId).subscribe(post => {
        this.post = post;
      });
    } else {
      this.mode = 'create';
    }
  }

  onSavePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost({
        id: this.postId!,
        title: form.value.title,
        content: form.value.content,
      });
    }

    form.reset();
  }
}
