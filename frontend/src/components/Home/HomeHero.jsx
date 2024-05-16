import { IconRocket } from "@tabler/icons-react";
import debateIllustration from "@/assets/imgs/debate_illustration.svg";

export const HomeHero = () => {
    return (
        <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 bg-gray-50">
            <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                <img
                    className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                    src={debateIllustration}
                    alt="Debate Illustration"
                />
            </div>
            <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-rose-500">
                        Beta
                    </p>
                    <h2 className="mb-5 font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                        The First Debate-centric
                        <br className="hidden md:block" />
                        platform{" "}
                        <span className="inline-block text-deep-purple-accent-400">
                            out there
                        </span>
                    </h2>
                    <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg font-medium">
                        Join the premier hub for spirited debates and
                        intellectual exchange. Elevate your arguments and
                        connect with a community passionate about discourse.
                    </p>
                    <div className="flex items-center">
                        <a
                            href="/signup"
                            className="inline-flex items-center justify-center text-white rounded-xl px-6 py-3 mr-6 font-semibold bg-rose-500 hover:bg-rose-600 focus:ring-rose-300 focus:outline-none focus:ring-4"
                        >
                            <IconRocket className="mr-2 h-5 w-5" />
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
