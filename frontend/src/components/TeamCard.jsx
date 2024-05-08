import { Card } from "flowbite-react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export const TeamCard = ({
    fullName,
    position,
    imageSrc,
    linkedin,
    github,
}) => {
    return (
        <Card className="w-72 rounded-2xl">
            <div className="flex flex-col items-center">
                <img
                    alt={`${fullName} image`}
                    height="96"
                    src={imageSrc}
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-semibold text-gray-800 dark:text-white">
                    {fullName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {position}
                </span>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <a
                        href={linkedin}
                        target="_blank"
                        className="inline-flex items-center rounded-lg bg-rose-500 px-4 py-2 text-center text-sm text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 font-semibold gap-1"
                    >
                        <IconBrandLinkedin size={18} />
                        LinkedIn
                    </a>
                    <a
                        href={github}
                        target="_blank"
                        className="inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-center text-sm text-gray-700 hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700 font-semibold gap-1"
                    >
                        <IconBrandGithub className="text-gray-600" size={18} />
                        Github
                    </a>
                </div>
            </div>
        </Card>
    );
};
