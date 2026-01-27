import { useRef } from "react";
import { EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import '../../index.css';

// React-icons
import { FaAlignLeft, FaAlignRight, FaAlignCenter, FaAlignJustify } from "react-icons/fa";


const RichEditor = ({onChange}) => {

  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote']
      })
    ],
    content: "",
    onUpdate({editor}) {
      onChange(editor.getHTML());
    }
  })

  if(!editor) return null;

  return (
    <div  
      className="border-0 rounded-lg bg-gray-100 px-4 py-3"
    >
      
      {/* Toolbar */}
     <div className="editor-toolbar mb-3 border-b pb-2">

        {/* ----- Text Bold ----- */}
        <button
          className={`editor-btn ${editor.isActive("bold") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </button>

        {/* ----- Text Italic ----- */}
        <button
          className={`editor-btn ${editor.isActive("italic") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>
        
        {/* ----- Text Blockquote ----- */}
        <button
          className={`editor-btn ${editor.isActive("blockquote") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </button>

        {/* ----- Image input ----- */}
        <button
          className="editor-btn"
          onClick={() => fileInputRef.current.click()}
        >
          🖼
        </button>
        <input 
          type="file" 
          ref={fileInputRef}
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if(!file) return;

            const reader = new FileReader();
            reader.onload = () => {
              editor
                .chain()
                .focus()
                .setImage({src: reader.result})
                .run()
            }
            reader.readAsDataURL(file);

            // reset input
            e.target.value = "";
          }}
        />

        {/* ----- text alignments ----- */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <FaAlignLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <FaAlignCenter />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <FaAlignRight />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <FaAlignJustify />
        </button>
      </div>


      <EditorContent 
        onClick={() => editor.chain().focus().run()}
        editor={editor}
        className="min-h-96 outline-none"
      />
    </div>
  )
}

export default RichEditor