import { Avatar, Blockquote, Rating, RatingStar } from "flowbite-react";

export const DetailedQuote = () => {
    return (
        <figure className="max-w-screen-md mx-auto my-8 px-5">
            <div className="mb-4 flex justify-center">
                <Rating size="md">
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                </Rating>
            </div>
            <Blockquote>
                <p className="text-2xl font-medium text-gray-900 dark:text-white text-center">
                    &ldquo;Argyou is a groundbreaking platform where the art of
                    debate is truly appreciated and encouraged. With a wide
                    range of topics and a vibrant community, it&apos;s the
                    perfect space for those who want to challenge their thinking
                    and expand their perspectives&rdquo;
                </p>
            </Blockquote>
            <figcaption className="mt-6 flex justify-center items-center space-x-3">
                <Avatar
                    rounded
                    size="xs"
                    img="https://pyxis.nymag.com/v1/imgs/fbc/a12/0f0a9443d63acf6b84e148f7125b4253d5-30-ryan-gosling-study.rsquare.w400.jpg"
                    alt="Jordan Casey"
                />
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                    <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                        Jordan Casey
                    </cite>
                    <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                        Debate Enthusiast at Argyou
                    </cite>
                </div>
            </figcaption>
        </figure>
    );
};
