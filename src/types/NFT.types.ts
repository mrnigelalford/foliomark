import { Auction, Token } from './Auction.types';
import { Author } from './Author.types';

export interface NFT {
  _id?: string;
  url?: string;
  auction?: Auction[];
  Author?: Author;
  previewImg?: string;
  fullImg?: string;
  title: string;
  price?: number;
  token?: Token;
  likes?: number;
  category: string;
  views?: number;
  description: string;
}
