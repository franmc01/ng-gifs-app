import { GiphyItem } from "./giphy.response";

export interface Gif extends Pick<GiphyItem, 'id' | 'title' | 'url'> {}