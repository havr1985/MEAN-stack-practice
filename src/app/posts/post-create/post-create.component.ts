import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { PostsService } from '../posts.service';

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
export class PostCreateComponent {
  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.reset();
  }
}
