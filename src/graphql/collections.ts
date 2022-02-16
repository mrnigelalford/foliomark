import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query GetAllCollections {
    collections {
      _id
      title
      description
      img
      views
      likes
      assets {
        url
        previewImg
        title
      }
    }
  }
`;
