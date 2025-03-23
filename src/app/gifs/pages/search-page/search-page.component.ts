import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GiphyService } from '../../services/giphy.service';;
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  gifs = signal<Gif[]>([])
  constructor(private giphyService: GiphyService){}

  searchGif(query: string){
    this.giphyService.loadGifSearched(query).subscribe((data) => this.gifs.set(data))
    ;
  }
}
