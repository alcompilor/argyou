import { createBrowserRouter } from "react-router-dom";
import { About } from "./pages/About";
import { Layout } from "./Layout";
import { Error404 } from "./pages/Error404";
import {Signup} from "./components/signup";

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
        path: "/about-us",
        element: <About />,
        errorElement: <Error404 />,
<<<<<<< HEAD
        children: [
            {
                index: true,
                element: <Signup/>
            },
            {
                path: "/signup",
                element:<Signup/>
            }
        ],
    },
=======
        children: [],
      },
    ],
  },
>>>>>>> 6080b5b08841be8bf35b5af03b1bb6c29fa1c375
]);
