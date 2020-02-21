import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {isScullyGenerated, TransferStateService} from '@scullyio/ng-lib';
import {of} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  apiArticles$ = this.http.get<any>(`https://jsonplaceholder.typicode.com/posts`).pipe(
    catchError(() => of([] as any[])),
    shareReplay(1)
  );
  constructor(private http: HttpClient, private transferState: TransferStateService) { }

  ngOnInit(): void {
  }

  

  // This is an example of using TransferState
  articles$ = isScullyGenerated()
    ? this.transferState.getState<any>('articles')
    : this.apiArticles$.pipe(tap(article => this.transferState.setState('articles', article)));

}
