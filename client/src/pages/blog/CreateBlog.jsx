import { useState } from "react";
import Button from "../../components/ui/Button";
import RichEditor from "../../components/blog/RichEditor";
import {useNavigate} from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const navigate = useNavigate();

  const handlePublish = () => {
    console.log("Title:", title);
    console.log("Story:", story);
    // You can add API call here to save the blog
  };

  return (
    <div className="max-w-225 mx-auto mt-12">
      <div className="mb-5 flex justify-between mt-5">
        <button
          onClick={() => navigate(-1)} // go back to previous page
          className="px-5 py-2 bg-red-500 text-white font-semibold rounded-md cursor-pointer "
        >
          Back
        </button>

        <Button
          variant="primary"
          onClick={handlePublish}
          disabled={!title || !story}
        >
          Publish
        </Button>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Title of your story..."
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-0 rounded-lg bg-gray-100 focus:outline-none w-full text-3xl font-serif px-5 py-3 mb-6"
      />

      <RichEditor onChange={setStory} value={story} />
    </div>
  );
};

export default CreateBlog;
