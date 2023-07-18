import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { REGISTER_POST, UPDATE_POST } from "../graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { GET_POST } from "../graphql/Query";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const { Id } = useParams();

  useEffect(() => {
    console.log("uploadaded");
  }, [uploaded]);

  const [MyMutation] = useMutation(REGISTER_POST);

  const {
    loading: postLoading,
    data: postData,
    error: postError,
  } = useQuery(GET_POST, {
    variables: {
      id: Id,
    },
  });

  useEffect(() => {
    if (Id && postData) {
      const { id, thamnail, title, body, date } = postData.post[0];

      setTitle(title);
      setBody(body);
      setThumbnail(thamnail);
      setImagePreview(thamnail);
    }
  }, [postData]);

  const [updatePost] = useMutation(UPDATE_POST);

  const handleUploadImage = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "daadaa apollo");

      setLocalLoading(true);
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dye8qovho/image/upload",
        formData
      );

      console.log(data);

      setUploaded(true);
      setThumbnail(data.url);
      setLocalLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageSelect = (event) => {
    setUploaded(false);
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(window.URL.createObjectURL(file));
  };

  const handalQuillChange = (event) => {
    setBody(event);
  };

  const handalSubmit = async (event) => {
    console.log(title);
    console.log(body);
    console.log(imagePreview);
    console.log(thumbnail);
    event.preventDefault();

    if (!thumbnail || !title || !body) return alert("Please fill empty Fields");

    try {
      if (Id) {
        const { data, loading, error } = updatePost({
          variables: {
            id: Id,
            title,
            body,
            thamnail: thumbnail,
          },
        });
      } else {
        const { data, loading, error } = MyMutation({
          variables: {
            title,
            body,
            thamnail: thumbnail,
          },
        });
      }
      // if (error) return alert("something went wrong");
      // if (loading) setLocalLoading(true);
      setTitle("");
      setBody("");
      setThumbnail("");
      setImagePreview("");
      setSelectedFile("");
      toast.success("Success");
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };
  return (
    <div>
      <motion.form
        onSubmit={handalSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-[80%] mx-auto"
        action=""
      >
        <label className="Label"> Post title</label>
        <input
          className="Input"
          placeholder="Post thumnile"
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="Label">Post Body</label>
        <ReactQuill
          onChange={handalQuillChange}
          theme="snow"
          value={body}
          modules={NewPost.modules}
          formats={NewPost.formats}
        />
        <input
          type="file"
          className="Input"
          id="fname"
          name="fname"
          onChange={handleImageSelect}
        />
        <div className="Preview" style={{}}>
          {imagePreview && <img src={imagePreview} />}
        </div>
        <button
          className="Button bg-red-400"
          type="button"
          disabled={localLoading}
          onClick={handleUploadImage}
        >
          {localLoading ? "uploading..." : "upload"}
        </button>

        <button type="submit" className="Button" disabled={localLoading}>
          {localLoading ? "loading..." : Id ? "Update" : "Register"}
        </button>
      </motion.form>
    </div>
  );
};

export default NewPost;

NewPost.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

NewPost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
