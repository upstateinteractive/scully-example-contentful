import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {pluck, shareReplay, switchMap, catchError, tap, filter, map} from 'rxjs/operators';
import {isScullyGenerated, TransferStateService} from '@scullyio/ng-lib';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private transferState: TransferStateService
  ) { }

  ngOnInit(): void {
  }

  articleId$: Observable<number> = this.route.params.pipe(
    pluck('articleId'),
    filter(val => ![undefined, null].includes(val)),
    map(val => parseInt(val, 10)),
    shareReplay(1)
  );

  apiArticles$ = this.articleId$.pipe(
    switchMap(id =>
      this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
        catchError(() =>
          of({
            id,
            title: 'not found',
          } as any)
        )
      )
    ),
    shareReplay(1)
  );

  // This is an example of using TransferState
  article$ = isScullyGenerated()
    ? this.transferState.getState<any>('article')
    : this.apiArticles$.pipe(tap(article => this.transferState.setState('article', article)));
}
