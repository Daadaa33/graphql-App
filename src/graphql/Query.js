import { gql } from "@apollo/client";

export const GET_POST = gql`
  query MyQuery($id: Int) {
    post(where: { id: { _eq: $id } }) {
      body
      date
      id
      thamnail
      title
    }
  }
`;
