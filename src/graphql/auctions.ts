import { gql } from '@apollo/client';

export const GET_AUCTIONS = gql`
  query Auctions {
    auctions {
      url
      nftID
      startingPrice
      currentPrice
      bids
      token
      asset {
        _id
        url
        previewImg
        title
        author {
          _id
          bioLink
          img
          name
        }
      }
    }
  }
`;
