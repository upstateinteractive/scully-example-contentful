import {Component, OnInit} from '@angular/core';
import {isScullyGenerated, TransferStateService} from '@scullyio/ng-lib';
import {of} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import { ContentfulService } from 'src/app/contentful.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  apiArticles$ = this.contentfulService.getArticles().pipe(
    catchError(() => of([] as any[])),
    shareReplay(1)
  );
  constructor(
    private transferState: TransferStateService,
    private contentfulService: ContentfulService
  ) { }

  ngOnInit(): void {
    this.contentfulService.getArticles().subscribe(console.dir)
  }

  

  // This is an example of using TransferState
  articles$ = isScullyGenerated()
    ? this.transferState.getState<any>('articles')
    : this.apiArticles$.pipe(tap(article => this.transferState.setState('articles', article)));

}
