import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query Assets {
    assets {
      title
      token
      category
      description
    }
  }
`;

export default GET_ASSETS;
