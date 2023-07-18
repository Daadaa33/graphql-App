import { gql } from "@apollo/client";

export const REGISTER_POST = gql`
  mutation MyMutation($body: String, $title: String, $thamnail: String) {
    insert_post(objects: { title: $title, body: $body, thamnail: $thamnail }) {
      returning {
        id
        body
        title
        thamnail
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $id: Int
    $title: String
    $body: String
    $thamnail: String
  ) {
    update_post(
      where: { id: { _eq: $id } }
      _set: { title: $title, body: $body, thamnail: $thamnail }
    ) {
      returning {
        id
        title
        body
        thamnail
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: Int) {
    delete_post(where: { id: { _eq: $id } }) {
      returning {
        id
        date
        body
        thamnail
        title
      }
    }
  }
`;
