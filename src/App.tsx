import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Screen from "./screens";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Screen.Home />,
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
      path: "/feed",
      element: <Screen.Feed />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
