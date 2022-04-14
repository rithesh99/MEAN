import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}
  getPosts() {
    this.http
      .get<{ success: boolean; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.posts.map((post: any) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((data) => {
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
    return this.posts;
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: (this.posts.length + 1).toString(),
      title: title,
      content: content,
    };
    // this.posts.push(post);
    this.http
      .post<{ success: boolean }>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
    this.postsUpdated.next([...this.posts]);
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    this.http
      .delete<{ success: boolean }>(`http://localhost:3000/api/posts/${id}`)
      .subscribe((data) => {
        this.posts = this.posts.filter((post) => post.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
