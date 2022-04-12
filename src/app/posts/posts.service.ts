import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}
  getPosts() {
    this.http
      .get<{ success: boolean; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((data) => {
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
      });
    return this.posts;
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: this.posts.length + 1,
      title: title,
      content: content,
    };
    // this.posts.push(post);
    this.http
      .post<{ success: boolean }>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        console.log(data.success);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
    this.postsUpdated.next([...this.posts]);
  }
}
