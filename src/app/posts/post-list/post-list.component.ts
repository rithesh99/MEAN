import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 1;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  onChangedPage(event: any) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;

    this.posts = this.postsService.getPosts(
      this.postsPerPage,
      this.currentPage
    );
  }
  ngOnInit() {
    this.isLoading = true;
    this.posts = this.postsService.getPosts(
      this.postsPerPage,
      this.currentPage
    );
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
}
