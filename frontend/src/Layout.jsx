import { Outlet } from "react-router-dom";
import { Navbar } from "./components/clientUI/Navbar.jsx";
import { Footer } from "./components/clientUI/Footer.jsx";
import { useAuthState } from "@/hooks/useAuthState";

export const Layout = () => {
    const authState = useAuthState();
    return (
        <>
            <header>
                <Navbar isLoggedIn={authState} />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
