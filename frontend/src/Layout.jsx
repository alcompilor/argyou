import { Outlet } from "react-router-dom";
import { Navbar } from "./components/clientUI/Navbar.jsx";
import { Logo } from "./components/clientUI/Logo.jsx";
import { Footer } from "./components/clientUI/Footer.jsx";
import "./assets/styles/layout.css";

const isPhone = () => {
    const phonePattern =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return phonePattern.test(navigator.userAgent);
};

export const Layout = () => {
    const isLoggedIn = true;
    return (
        <>
            <header>
                {isPhone() ? (
                    <>
                        <details>
                            <summary>
                                <Logo width={250} height={50} />
                            </summary>
                            <Navbar isLoggedIn={isLoggedIn} />
                        </details>
                    </>
                ) : (
                    <>
                        <Logo width={250} height={50} />
                        <Navbar isLoggedIn={isLoggedIn} />
                    </>
                )}
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}