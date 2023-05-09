import { Dialog } from "./screens/Chat/Dialog";
import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";
import { CreateTeam } from "./screens/Team/CreateTeam";
import { Join, Login } from "./screens";

const User = {
  //유저 객체 - 이메일, 비밀번호
  ID: String,
  Password: String,
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Dialog />,
    },
    {
      path: "/join",
      element: <Join />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/createteam",
      element: <CreateTeam />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
