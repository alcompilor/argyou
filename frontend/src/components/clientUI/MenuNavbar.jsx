import { NavLink } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";

export const MenuNavbar = ({ isLoggedIn }) => {
  const linkStyle =
    "hover:bg-rose-500 focuse:text-white hover:text-white text-gray-700 font-medium";
  const listStyle = "py-3 px-4 hover:bg-rose-500 focuse:bg-rose-500";
  return (
    <section className="absolute bg-white rounded">
      <ul>
        <li className={listStyle}>
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li className={listStyle}>
              <NavLink to="/debate-space" className={linkStyle}>
                Debate Space
              </NavLink>
            </li>
            <li className={listStyle}>
              <NavLink to="/profile" className={linkStyle}>
                Profile
              </NavLink>
            </li>
            <li className={listStyle}>
              <NavLink to="/notifications" className={linkStyle}>
                Notifications
              </NavLink>
            </li>
            <li className={listStyle}>
              <NavLink to="/logout" className={linkStyle}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={listStyle}>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
            </li>
            <li className={listStyle}>
              <NavLink to="/signup" className={linkStyle}>
                Signup
              </NavLink>
            </li>
          </>
        )}
        <li className={listStyle}>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg py-1 pr-12 focus:outline-gray-800 text-gray-800 w-full"
            />
            <IconSearch className="absolute right-3 text-gray-500 h-6 w-6" />
          </div>
        </li>
        <li className={listStyle}>
          <NavLink to="/about-us" className={linkStyle}>
            About us
          </NavLink>
        </li>
      </ul>
    </section>
  );
};
