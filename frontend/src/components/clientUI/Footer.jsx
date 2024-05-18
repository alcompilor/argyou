import { Footer as FooterFlowBite } from "flowbite-react";
import { Logo } from "../../components/clientUI/Logo.jsx";
import {
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
} from "react-icons/bs";

export const Footer = () => (
    <FooterFlowBite container className="p-6 bg-gray-800 rounded-none">
        <div className="w-full text-center">
            <div className="w-full justify-center flex items-center gap-5 flex-col">
                <Logo logoType="white" className="w-36" />
                <p className="text-white">
                    Join the conversation and engage in thoughtful debates on
                    ArgYou.
                </p>
                <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                    <FooterFlowBite.Icon
                        href="#"
                        icon={BsFacebook}
                        className="text-white"
                    />
                    <FooterFlowBite.Icon
                        href="#"
                        icon={BsInstagram}
                        className="text-white"
                    />
                    <FooterFlowBite.Icon
                        href="#"
                        icon={BsTwitter}
                        className="text-white"
                    />
                    <FooterFlowBite.Icon
                        href="#"
                        icon={BsGithub}
                        className="text-white"
                    />
                    <FooterFlowBite.Icon
                        href="#"
                        icon={BsDribbble}
                        className="text-white"
                    />
                </div>
            </div>
            <FooterFlowBite.Divider className="opacity-30" />
            <FooterFlowBite.Copyright
                href="/"
                by="ArgYou Platform™"
                year={new Date().getFullYear()}
                className="text-white"
            />
        </div>
    </FooterFlowBite>
);
