import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { CONFIG } from '../../CONTENTFUL.CONFIG';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() { }

  getArticles(query?: object): Observable<Entry<any>[]> {
    return from(
      this.cdaClient.getEntries({
        ...query,
        content_type: CONFIG.contentTypeIds.article
      })
    )
      .pipe(
        map(res => res.items),
        map(items => items.map(i => ({
          id: i.sys.id,
        ...i.fields as any
        })))
      )
  }

  getArticle(id): Observable<Entry<any>> {
    return from(
      this.cdaClient.getEntry(id)
    )
      .pipe(map(e => ({
        id: e.sys.id,
        ...e.fields as any
      })), tap(console.dir))
  }
}
