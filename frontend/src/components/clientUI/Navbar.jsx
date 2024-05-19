import { NavLink } from "react-router-dom";
import { Logo } from "./Logo.jsx";
import { IconBell } from "@tabler/icons-react";
import { Navbar as NavbarFlowBite } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/services/logoutUser.js";

export const Navbar = ({ isLoggedIn }) => {
    const { mutate } = useMutation({ mutationFn: logoutUser });
    const handleLogout = () => {
        mutate();
    };

    const styleLink =
        "transition-colors duration-300 ease-in-out hover:bg-gray-800 rounded-lg p-2 text-white font-bold";
    return (
        <NavbarFlowBite className="bg-rose-500 md:py-4 py-5 px-6">
            <NavLink to="/">
                <Logo className="w-32" logoType="white" />
            </NavLink>
            <div className="flex md:order-2 gap-2 items-center">
                {isLoggedIn ? (
                    <NavLink
                        to="/debate-space"
                        className="text-rose-600 hover:bg-rose-50 bg-rose-100  focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Debate Space
                    </NavLink>
                ) : (
                    <NavLink
                        to="/login"
                        className="text-rose-600 hover:bg-rose-50 bg-rose-100  focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Sign In
                    </NavLink>
                )}
                <NavbarFlowBite.Toggle className="text-white hover:bg-gray-800" />
            </div>
            <NavbarFlowBite.Collapse>
                <NavLink to="/" className={styleLink}>
                    Home
                </NavLink>
                <NavLink to="/about-us" className={styleLink}>
                    About Us
                </NavLink>
                {isLoggedIn ? (
                    <>
                        <NavLink
                            to="/profile"
                            className={`${styleLink} flex items-center gap-2`}
                        >
                            <li>
                                <IconBell className="absolut text-white-500 fill-current hover:fill-rose-500" />
                            </li>
                            Profile
                        </NavLink>
                        <NavLink
                            to="/"
                            onClick={handleLogout}
                            className={styleLink}
                        >
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <NavLink to="/signup" className={styleLink}>
                        Create an Account
                    </NavLink>
                )}
            </NavbarFlowBite.Collapse>
        </NavbarFlowBite>
    );
};
