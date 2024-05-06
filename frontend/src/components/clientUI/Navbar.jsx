import { NavLink } from "react-router-dom";

export const Navbar = ({ isLoggedIn }) => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"} style={linkState}>
                        Home
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <NavLink to={"/debate-space"} style={linkState}>
                                Debate Space
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/profile"} style={linkState}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/logout"} style={linkState}>
                                Logout
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to={"/login"} style={linkState}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/signup"} style={linkState}>
                                Signup
                            </NavLink>
                        </li>
                    </>
                )};
                <li>
                    <NavLink to={"/about-us"} style={linkState}>
                        About Us
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};