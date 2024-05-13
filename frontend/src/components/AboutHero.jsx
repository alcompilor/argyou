import {
    IconSpeakerphone,
    IconUsers,
    IconTrophy,
    IconMailFilled,
    IconDots,
} from "@tabler/icons-react";
import logoWhite from "@/assets/isolated-white.svg";

export const AboutHero = () => {
    return (
        <div className="mb-16">
            <div className="bg-zinc-100">
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <div>
                            <p className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-white uppercase rounded-full bg-zinc-800">
                                <div className="flex justify-center gap-1 items-end">
                                    About
                                    <img
                                        src={logoWhite}
                                        width={58}
                                        height={58}
                                    />
                                </div>
                            </p>
                        </div>
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                            <span className="relative inline-block">
                                <svg
                                    viewBox="0 0 52 24"
                                    fill="currentColor"
                                    className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                                >
                                    <defs>
                                        <pattern
                                            id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                                            x="0"
                                            y="0"
                                            width=".135"
                                            height=".30"
                                        >
                                            <circle cx="1" cy="1" r=".7" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                                        width="52"
                                        height="24"
                                    />
                                </svg>
                                <span className="relative">This</span>
                            </span>{" "}
                            is Where Ideas Flourish and Minds Spark.
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg font-medium">
                            We empower users to articulate their ideas,
                            challenge perspectives, and participate in
                            constructive dialogues, ultimately shaping a more
                            informed and connected world.
                        </p>
                    </div>
                    <div className="flex items-center sm:justify-center">
                        <a
                            href="mailto:team@argyou.app"
                            className="inline-flex items-center justify-center text-white rounded-xl px-5 py-2 mr-6 font-semibold bg-rose-500 hover:bg-rose-600 focus:ring-rose-300 focus:outline-none focus:ring-4"
                        >
                            <IconMailFilled className="mr-2 h-5 w-5" />
                            Contact Us
                        </a>
                        <a
                            href="#team"
                            aria-label=""
                            className="inline-flex items-center font-semibold text-gray-700 transition-colors duration-200 hover:text-gray-800"
                        >
                            <IconDots className="mr-2 h-5 w-5" />
                            Learn more
                        </a>
                    </div>
                </div>
            </div>
            <div className="relative px-4 sm:px-0">
                <div className="absolute inset-0 bg-zinc-100 h-1/2" />
                <div className="relative grid mx-auto overflow-hidden bg-white divide-y rounded-2xl shadow sm:divide-y-0 sm:divide-x sm:max-w-screen-sm sm:grid-cols-3 lg:max-w-screen-md">
                    <div className="inline-block p-8 text-center">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-100">
                            <IconSpeakerphone className="text-gray-800" />
                        </div>
                        <p className="font-bold tracking-wide text-gray-800">
                            Unleash Your Voice
                        </p>
                    </div>
                    <div className="inline-block p-8 text-center">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-100">
                            <IconUsers className="text-gray-800" />
                        </div>
                        <p className="font-bold tracking-wide text-gray-800">
                            Expand Your Audience
                        </p>
                    </div>
                    <div className="inline-block p-8 text-center">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-100">
                            <IconTrophy className="text-gray-800" />
                        </div>
                        <p className="font-bold tracking-wide text-gray-800">
                            Win Your Arguments
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
