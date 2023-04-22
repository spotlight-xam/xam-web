import { Dialog } from "./screens/Chat/Dialog";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/chat",
      element: <Dialog />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
