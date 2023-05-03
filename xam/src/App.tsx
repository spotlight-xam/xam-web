import { Dialog } from "./screens/Chat/Dialog";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Team } from "./screens/Team/Team";
import { CreateTeam } from "./screens/Team/CreateTeam";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Dialog />,
    },
    {
      path: "/createTeam",
      element: <CreateTeam />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
