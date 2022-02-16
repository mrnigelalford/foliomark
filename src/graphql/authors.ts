import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query Authors {
    authors {
      _id
      bioLink
      img
      name
      sales
    }
  }
`;
