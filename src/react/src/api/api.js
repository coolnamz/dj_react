import axios from "axios";
const API = axios.create();

// Developer
export const AddressPostsAPI = "localhost:8000/api/posts/";
export const PostsList = () => API.get(AddressPostsAPI);
export const PostsCreate = (title, content, draft, publish) =>
  API.post(AddressPostsAPI, {
    title: title,
    content: content,
    draft: draft,
    publish: publish,
  });
