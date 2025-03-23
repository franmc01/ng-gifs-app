import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.response";

/**
 * Mapea un solo DTO a modelo limpio.
 */
export const mapToGif = (dto: GiphyItem): Gif => ({
  title: dto.title,
  url: dto.images.original.url,
  id: dto.id
});

/**
 * Mapea una lista de DTOs a modelos limpios.
 */
export const mapToGifList = (dtoList: GiphyItem[]): Gif[] => dtoList.map(mapToGif);
