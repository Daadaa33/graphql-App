import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./component/Header.jsx";
import Post from "./component/Post.jsx";
import NewPost from "./component/NewPost.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolla.js";
import PostInfo from "./component/PostInfo.jsx";
import Messages from "./component/Messages.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "Error 404",
    children: [
      {
        path: "/",
        element: <Post />,
        index: true,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/new-post/:Id",
        element: <NewPost />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/post/:id",
        element: <PostInfo />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </ApolloProvider>
  </React.StrictMode>
);
