import { fetchUser } from "@/services/fetchUser";
import { bufferToBase64 } from "@/utils/bufferToBase64";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Alert } from "flowbite-react";

export const Comment = ({ username, content, publishDate }) => {
    const { data, status } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(username),
    });

    const renderError = () => (
        <Alert color="failure">
            <span className="font-semibold">Something went wrong</span> — Unable
            to load comment
        </Alert>
    );

    const renderPending = () => (
        <Spinner color="pink" aria-label="Loading Spinner" />
    );

    const renderSuccess = () => (
        <>
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={`data:${
                                data.data.avatar.mime
                            };base64,${bufferToBase64(
                                data?.data?.avatar?.buffer?.data,
                            )}`}
                            alt={data.data.fullName}
                        />
                        {data.data.fullName}{" "}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime={publishDate}>
                            {formatDate(publishDate)}
                        </time>
                    </p>
                </div>
            </footer>
            <p className="text-gray-800 dark:text-gray-400 max-w-2xl break-all">
                {content}
            </p>
        </>
    );

    return (
        <article className="p-6 text-base bg-white border-t border-gray-300 dark:border-gray-700 dark:bg-gray-900">
            {status === "error" && renderError()}
            {status === "pending" && renderPending()}
            {status === "success" && data && renderSuccess()}
        </article>
    );
};
