import { Logo } from "../../components/clientUI/Logo.jsx";
import {
    IconBrandInstagram,
    IconBrandFacebook,
    IconBrandX,
} from "@tabler/icons-react";

export const Footer = () => (
    <footer>
        <section>
            <hr />
            <section className="footer-logo">
                <Logo width={170} height={35} />
                <section className="footer-address">
                    <p>245 Oak Street, Suite 200, Springfield, 1L 62701</p>
                    <p>Phone: (123) 456-7890</p>
                </section>
            </section>
            <section className="footer-social">
                <h4>Follow us</h4>
                <section>
                    <a href="#">
                        <IconBrandFacebook size={30} />
                    </a>
                    <a href="#">
                        <IconBrandInstagram size={30} />
                    </a>
                    <a href="#">
                        <IconBrandX size={30} />
                    </a>
                </section>
            </section>
            <section className="footer-copyright">
                <h4>&copy; 2024 ArgYou. All rights reserved.</h4>
            </section>
            <section className="footer-legal">
                <a href="#">Terms of Service</a> | 
                <a href="#">Privacy Policy</a> | 
                <a href="#">FAQs</a> | 
                <a href="#">Community Guidelines</a>
            </section>
        </section>
    </footer>
);