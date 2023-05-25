import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Post } from "./MyPostList";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface WritePostProps {
  onCreate: (post: Pick<Post, "title" | "contents" | "text">) => void;
}
export function WritePost({ onCreate }: WritePostProps) {
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
    `,
  });

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "500px",
            height: "500px",
            backgroundColor: "#fff",
            padding: 16,
            border: "#000 3px solid",
            borderRadius: "5px",
            overflowY: "scroll",
            marginBottom: "24px",
          }}
        >
          <EditorContent editor={editor} />
        </div>
        <Button
          onClick={() => {
            if (editor) {
              onCreate({
                title: "타이틀",
                text: editor.getText(),
                contents: editor.getHTML(),
              });
              navigate("/posts");
            }
          }}
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}
