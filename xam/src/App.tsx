import { Chat } from "./screens/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/chat",
      element: <Chat />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
