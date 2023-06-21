import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as Screen from "./screens";
import { postList as initPostList } from "./assets/temp/blog";
import dayjs from "dayjs";

function App() {
  const [postList, setPostList] = useState(initPostList);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Screen.Dialog />,
    },
    {
      path: "/join",
      element: <Screen.Join />,
    },
    {
      path: "/login",
      element: <Screen.Login />,
    },
    {
      path: "/createteam",
      element: <Screen.CreateTeam />,
    },
    {
      path: "/posts",
      element: <Screen.MyPostList postList={postList} />,
    },
    {
      path: "/post/write",
      element: (
        <Screen.WritePost
          onCreate={({ contents, title, text }) => {
            setPostList((prev) => [
              ...prev,
              {
                contents,
                title,
                text,
                summary: "요약..",
                createdAt: dayjs().format("YYYY.MM.DD hh:mm"),
              },
            ]);
          }}
        />
      ),
    },
    {
      path: "/resumes",
      element: <Screen.WriteResume postList={postList} />,
    },
    {
      path: "/resume/write",
      element: <Screen.WriteResume postList={postList} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
