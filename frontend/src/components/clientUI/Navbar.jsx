import { NavLink } from "react-router-dom";
import { Logo } from "./Logo.jsx";
import { IconBell, IconSearch } from "@tabler/icons-react";

export const Navbar = ({ isLoggedIn }) => {
  const styleLink =
    "transition-colors duration-300 ease-in-out hover:bg-gray-700 rounded-lg p-2";
  return (
    <nav className="bg-rose-500 min-h-[9vh] w-full">
      <div className="container mx-auto md:flex justify-between items-center px-4">
        <ul className="md:flex text-white font-bold mt-4 md:mt-0 text-sm">
          <Logo
            width={150}
            height={50}
            className={"py-4 px-5"}
            logoType={"white"}
          />
          <li className="py-6 px-4">
            <NavLink to="/" className={styleLink}>
              Home
            </NavLink>
          </li>
          <li className="py-6 px-4">
            <NavLink to="/about-us" className={styleLink}>
              About Us
            </NavLink>
          </li>
        </ul>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg py-1 pr-12 focus:outline-gray-800 text-gray-800 w-full"
          />
          <IconSearch className="absolute right-3 text-gray-500 h-6 w-6" />
        </div>
        <ul className="md:flex gap-2 text-white font-bold mt-4 md:mt-0 text-sm">
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
                <IconBell className="absolut text-white-500 fill-current hover:fill-rose-500" />
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
