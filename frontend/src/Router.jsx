import { createBrowserRouter } from "react-router-dom";
import { About } from "./pages/About";
import { Layout } from "./Layout";
import { Error404 } from "./pages/Error404";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { Profile } from "./pages/Profile";
import {SignUp} from "./pages/SignUp";
import { Admin } from "./pages/Admin";
import { DebateSpace } from "./pages/DebateSpace";
import { DebateRoom } from "./pages/DebateRoom";

// You can add new routes in the children array to render pages.
// This github module has an example of how to do so:
// https://github.com/Medieinstitutet/the-restaurant-nummichain-grupp2/blob/main/therestaurant/src/Router.jsx

// For more on how to use React-Router-DOM:
// https://reactrouter.com/en/main/start/tutorial

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
        errorElement: <Error404 />,
        children: [],
      },
      {
        path: "/login",
        element: <SignIn />,
        errorElement: <Error404 />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error404 />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <Error404 />,
      },
      {
        path: "/admin-panel",
        element: <Admin />,
        errorElement: <Error404 />,
      },
      {
        path: "/debate-space",
        element: <DebateSpace />,
        errorElement: <Error404 />,
      },
      {
        path: "/debate-room/:id",
        element: <DebateRoom />,
        errorElement: <Error404 />,
      }
    ],
  },
]);
