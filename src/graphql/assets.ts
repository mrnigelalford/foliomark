import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query Assets {
    assets {
      _id
      url
      title
      token
      category
      description
      previewImg
      price
      author {
        name
        bioLink
        img
      }
    }
  }
`;

export default GET_ASSETS;
