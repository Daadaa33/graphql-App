import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DELETE_POST } from "../graphql/mutation";
import { GET_ALL_POST } from "./Post";
import { toast } from "react-hot-toast";

const GET_POST_INFO = gql`
  query MyQuery($id: Int) @cached {
    post(where: { id: { _eq: $id } }) {
      body
      date
      thamnail
      title
      id
    }
  }
`;

const PostInfo = () => {
  const qq = useParams();
  const Id = qq.id;
  const navigate = useNavigate();

  const [deletePost] = useMutation(DELETE_POST);

  const { loading, error, data } = useQuery(GET_POST_INFO, {
    variables: { id: Id },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    console.error(error);
    return <h1>Error</h1>;
  }

  const { title, body, thamnail, id, date } = data.post[0];

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post")) return;

    const { data, error, loading } = deletePost({
      variables: { id: Id },

      update(cache, { data: { deletePost } }) {
        const { post } = cache.readQuery({
          query: GET_ALL_POST,
        });
        cache.writeQuery({
          query: GET_ALL_POST,
          data: {
            post: post.filter((currentPost) => currentPost.id != Id),
          },
        });
      },
    });
    if (!error) {
      navigate("/");
    }
    toast.success("successfully deleted");
  };

  return (
    <div className="flex flex-col">
      <img
        className="w-full h- rounded-[5px] bg-cover bg-no-repeat"
        src={thamnail}
        alt=""
      />
      <h3 className="text-[2.2rem] font-[700] py-[25px]">{title}</h3>
      <div className="flex justify-between items-center text-whites">
        <div className="inline-block rounded-[10px] ">
          <span className="bg-[#3F45D1] text-white rounded-sm py-[5px] px-[15px] text-[14px]">
            Coding
          </span>
        </div>
        <div className="flex text-[#000] font-[500] text-[20px] italic ">
          <p>By Abdikadir Qulle &nbsp;&nbsp;</p> At{" "}
          {new Date(date).toDateString()}
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: body }} />
      <Link to={`/new-post/${id}`}>
        <button className="btn">Update</button>
      </Link>
      <button
        className="btn"
        style={{ background: "red" }}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PostInfo;
