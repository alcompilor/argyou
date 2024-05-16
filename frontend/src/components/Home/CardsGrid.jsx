import { Card } from "flowbite-react";

export const CardsGrid = () => {
    return (
        <div className="flex flex-wrap justify-center mt-10 gap-8 px-16 mb-10">
            <Card className="max-w-xs">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Real-Time Debates
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Engage in live debates with participants from around the
                    globe. Experience real-time communication and instant
                    feedback on your arguments.
                </p>
            </Card>
            <Card className="max-w-xs">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Expert Moderation
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {" "}
                    Benefit from expert moderation in all discussions to ensure
                    a respectful and constructive debate environment.
                </p>
            </Card>
            <Card className="max-w-xs">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Diverse Topics Library
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Access a vast library of topics ranging from politics and
                    philosophy to science and technology, curated to cater to
                    all interests and expertise levels.
                </p>
            </Card>
            <Card className="max-w-xs">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Secure & Anonymous Debating
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Participate in debates anonymously with options to conceal
                    your identity, ensuring privacy and reducing bias in
                    discussions.
                </p>
            </Card>
            <Card className="max-w-xs">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Analytics and Insights
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Gain insights into your debating style and effectiveness
                    through analytics that track your argumentation patterns,
                    win rate, and audience impact.
                </p>
            </Card>
        </div>
    );
};
