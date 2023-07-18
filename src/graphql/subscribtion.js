import { gql } from "@apollo/client";

export const GET_ALL_SUBS_POSTS = gql`
  subscription myQuery {
    post(order_by: { date: desc }) {
      body
      id
      date
      thamnail
      title
    }
  }
`;
