import { useState } from "react";
import Button from "../../components/ui/Button";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");

    const handlePublish = () => {
        console.log(title, story);
    }

  return (
    <div className='max-w-225 mx-auto mt-12'> 
        <input 
            type='text'
            name='title'
            placeholder='Title of your story...'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-0 rounded-lg bg-gray-100 focus:outline-none w-full text-3xl font-serif px-5 py-3 mb-6'
        />

        <textarea 
            type='text'
            name='body'
            placeholder='Tell your story...'
            required
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className='border-0 rounded-lg bg-gray-100 focus:outline-none w-full text-xl leading-relaxed font-serif px-5 py-3 min-h-96 resize-none'
        />

        <Button 
            className="mt-5"
            onClick={handlePublish}
            disabled={!title || !story}
        >Publish</Button>
    </div>
  )
}

export default CreateBlog;