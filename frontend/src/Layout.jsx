import { Outlet } from "react-router-dom";
import { Navbar } from "./components/clientUI/Navbar.jsx";
import { Footer } from "./components/clientUI/Footer.jsx";
import { Logo } from "./components/clientUI/Logo.jsx";
import { MenuNavbar } from "./components/clientUI/MenuNavbar.jsx";
import { useAuthState } from "@/hooks/useAuthState";

const isPhone = () => {
  const phonePattern =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return phonePattern.test(navigator.userAgent);
};

export const Layout = () => {
  const authState = useAuthState();
  return (
    <>
      <header>
        {isPhone() ? (
          <>
            <div className="flex items-center justify-between min-h-[6vh] bg-rose-500 py-2 px-4">
              <div className="flex-shrink-0">
                <Logo height={80} width={130} logoType={"white"} className={"p-2"} />
              </div>
              <details className="p-1 rounded-lg text-white">
                <summary className="text-lg ml-12 leading-2 font-semibold mb-2">Menu</summary>
                <MenuNavbar isLoggedIn={authState} />
              </details>
            </div>
          </>
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
