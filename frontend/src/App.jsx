import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import "./App.css";
import SignupPage from "./components/signup";

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
