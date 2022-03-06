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

export const SET_ASSET = gql`
  # Increments a back-end counter and gets its resulting value
  mutation SetAsset(
    $title: String
    $description: String
    $price: Int
    $category: Category
    $token: Token
    $fullImg: String
    $previewImg: String
  ) {
    setAsset(
      title: $title
      description: $description
      price: $price
      category: $category
      token: $token
      fullImg: $fullImg
      previewImg: $previewImg
    ) {
      id
    }
  }
`;

export default GET_ASSETS;
