import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, ObservableLike } from 'rxjs';
import { GiphyService } from '../../services/giphy.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-history',
  imports: [GifListComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export default class GifHistoryComponent {
  // private route = inject(ActivatedRoute);

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     console.log({ params });
  //   });
  // }

  readonly gifService = inject(GiphyService)
  private readonly route = inject(ActivatedRoute);

  readonly routeParams = toSignal(this.route.params as Observable<Params>, {
    initialValue: {} as Params,
  });

  readonly queryParam = computed(() => {
    const params = this.routeParams();
    return params?.['query'] ?? null;
  });

  gifs = computed(() => this.gifService.loadDataFromCache(this.queryParam()))

  constructor() {
    effect(() => {
      console.log('📦 Parámetro query:', this.queryParam());
    });
  }
}