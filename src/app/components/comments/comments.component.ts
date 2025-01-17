import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Comment } from '../../types/Comment';
import { Pagination } from '../../types/Films';
import { AuthService } from '../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription;
  @Input() movieId: number | null = null;
  newCommentContent: string = '';
  comments = signal<Comment[]>([]);
  pagination = signal<Pagination>({
    number: 0,
    size: 5,
    totalPages: 1,
    totalElements: 0,
  });
  
  constructor(
    private api: ApiService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    if (!this.movieId) return;

    const paginationParams = new HttpParams()
          .set('page-number', this.pagination().number.toString())
          .set('page-size', this.pagination().size.toString())
          .set('sort-direction', 'ASC');

    this.subscription.add(this.api.getComments(this.movieId, paginationParams).subscribe({
      next: (comments) => {
        this.comments.set(comments.data.content);
        this.pagination.set(comments.data.page);
      },
      error: (err) => console.error(err),
    }))
  }

  addComment() {
    if (!this.newCommentContent.length || !this.movieId) return;

    this.subscription.add(this.api.addMovieComment(this.newCommentContent, this.movieId).subscribe({
      next: (comment) => {
        this.newCommentContent = '';
        this.getComments();
      },
      error: (err) => console.error(err),
    }))
  }

  deleteComment(commentId: number) {
    this.subscription.add(this.api.deleteComment(commentId).subscribe({
      next: () => this.getComments(),
      error: (err) => console.error(err),
    }))
  }

  nextPaginationPage() {
    this.pagination.update(p => ({ ...p, number: p.number + 1 }));
    this.getComments();
  }

  previousPaginationPage() {
    if (this.pagination().number > 0) {
      this.pagination.update(p => ({ ...p, number: p.number - 1 }))
      this.getComments();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
