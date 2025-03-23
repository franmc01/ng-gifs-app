import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.response';
import { map, Observable, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';
import { mapToGifList } from '../mappers/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  // constructor(private http: HttpClient) { }
  private http = inject(HttpClient);
  private initialValue = JSON.parse(localStorage.getItem('gifs') ?? '{}')

  searchHistoryCache = signal<Record<string, Gif[]>>(this.initialValue)
  searchHistoryKeys = computed<String[]>(() => Object.keys(this.searchHistoryCache()));

  saveGifsToStorage = effect(() => {
    const data = JSON.stringify(this.searchHistoryCache())
    localStorage.setItem('gifs', data)
  })

  loadTrendingGifs(): Observable<Gif[]>{
    return this.http.get<GiphyResponse>(`${environment.giphy_url}/gifs/trending`, {
      params: {
        api_key: environment.api_key,
        limit: 12
      }
    }).pipe(map((res) => mapToGifList(res.data)))
  }

  loadGifSearched(query: string): Observable<Gif[]>{
    return this.http.get<GiphyResponse>(`${environment.giphy_url}/gifs/search`, {
      params: {
        api_key: environment.api_key,
        limit: 20,
        q: query
      }
    }).pipe(
      map((res) => mapToGifList(res.data)),
      tap((items) => {
        this.searchHistoryCache.update((prev) => ({
          ...prev,
          [query]: items
        }))
      })
    )
  }

  loadDataFromCache(query: string): Gif[]{
    return this.searchHistoryCache()[query] ?? []
  }

}
