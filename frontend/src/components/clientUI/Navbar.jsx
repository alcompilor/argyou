import "../../assets/styles/navbar.css";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo.jsx";
import { IconBell, IconSearch } from "@tabler/icons-react";

export const Navbar = ({ isLoggedIn }) => {
  const styleLink =
    "transition-colors duration-300 ease-in-out hover:bg-gray-700 rounded p-2";
  return (
    <nav className="bg-red-500 h-[9vh] w-full mb-5">
      <div className="container mx-auto flex justify-between items-center px-4">
        <ul className="flex text-white font-bold mt-4 md:mt-0 text-sm">
          <Logo
            width={140}
            height={50}
            style={"py-4 px-4"}
            logoType={"white"}
          />
          <li className="py-5 px-4">
            <NavLink to="/" className={styleLink}>
              Home
            </NavLink>
          </li>
          <li className="py-5 px-4">
            <NavLink to="/about-us" className={styleLink}>
              About Us
            </NavLink>
          </li>
        </ul>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg px-8 py-1 pr-10 focus:outline-gray-800 text-gray-800"
          />
          <IconSearch className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500" />
        </div>
        <ul className="flex gap-2 text-white font-bold mt-4 md:mt-0 text-sm">
          {isLoggedIn ? (
            <>
              <li className="py-3.5 px-4">
                <NavLink to="/debate-space" className={styleLink}>
                  Debate Space
                </NavLink>
              </li>
              <li className="py-3.5 px-4">
                <NavLink to="/profile" className={styleLink}>
                  Profile
                </NavLink>
              </li>
              <li className="relative py-3.5 px-4">
                <IconBell className="absolut text-white-500 fill-current hover:fill-red-500" />
              </li>
              <li className="py-3.5 px-4">
                <NavLink to="/logout" className={styleLink}>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="py-3.5 px-4">
                <NavLink to="/login" className={styleLink}>
                  Login
                </NavLink>
              </li>
              <li className="py-3.5 px-4">
                <NavLink to="/signup" className={styleLink}>
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
