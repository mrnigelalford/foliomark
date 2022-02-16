import { NFT } from './NFT.types';

export enum Token {
  XTZ = 'XTZ',
  WXTZ = 'WXTZ',
  CTEZ = 'CTEZ',
}

export interface Auction {
  nftID: string; //_id of the NFT in auction
  auctionURL: string;
  startingPrice?: number;
  currentPrice: number;
  endDate?: string;
  token: Token;
  bids?: number;
  nft: NFT;
}
