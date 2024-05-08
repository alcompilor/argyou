import { Outlet } from "react-router-dom";
import { Navbar } from "./components/clientUI/Navbar.jsx";
import { Footer } from "./components/clientUI/Footer.jsx";

const isPhone = () => {
  const phonePattern =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return phonePattern.test(navigator.userAgent);
};

export const Layout = () => {
  const authState = true;
  return (
    <>
      <header>
        {isPhone() ? (
          <details>
            <Navbar isLoggedIn={authState} />
          </details>
        ) : (
          <Navbar isLoggedIn={authState} />
        )}
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
