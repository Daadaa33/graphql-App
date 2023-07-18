import { gql, useQuery, useSubscription } from "@apollo/client";
import React from "react";

import Poost from "./Poost";
import { GET_ALL_SUBS_POSTS } from "../graphql/subscribtion";

export const GET_ALL_POST = gql`
  query MyQuery {
    post {
      thamnail
      title
      id
      body
      date
    }
  }
`;
function Post() {
  // const { data, loading, error } = useQuery(GET_ALL_POST);
  const { data, loading, error } = useSubscription(GET_ALL_SUBS_POSTS);

  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    console.error(error);
    return <h1>Error</h1>;
  }
  // console.log(data);
  return (
    <div className="grid grid-cols-4 row-span-2 gap-[10px] h-[65vh]">
      {data.post.map((post, index) => (
        <Poost index={index} key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Post;
