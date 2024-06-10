import { Alert, Spinner } from "flowbite-react";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchDebate } from "@/services/fetchDebate";
import { useParams } from "react-router-dom";

export const CommentSection = () => {
    const { id } = useParams();

    const { data, status, refetch } = useQuery({
        queryKey: ["debate-comments"],
        queryFn: () => fetchDebate(id),
    });

    const commentsEndRef = useRef(null);

    useEffect(() => {
        const scrollTimeout = setTimeout(() => {
            if (commentsEndRef.current) {
                commentsEndRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                });
            }
        }, 100);

        return () => clearTimeout(scrollTimeout);
    }, [data]);

    const renderSuccess = () => (
        <>
            <ul className="max-h-96 overflow-y-auto scroll-smooth">
                {data.data.comments.map((item) => (
                    <Comment
                        key={item._id}
                        id={item._id}
                        username={item.username}
                        content={item.content}
                        publishDate={item.publishDate}
                    />
                ))}
                <div ref={commentsEndRef} />
            </ul>
            <AddComment id={id} refetchComments={refetch} />
        </>
    );

    const renderPending = () => (
        <>
            <Spinner color="pink" aria-label="Loading Spinner" />
            <p>Loading Comment Section...</p>
        </>
    );

    const renderError = () => (
        <Alert color="failure">
            <span className="font-semibold">Something went wrong</span> — Unable
            to load comment section
        </Alert>
    );

    return (
        <section className="bg-white dark:bg-gray-900 px-10 py-12 flex flex-col gap-4 antialiased rounded-2xl md:max-w-md w-full">
            <h2 className="font-semibold text-2xl">Comments</h2>
            {status === "success" && renderSuccess()}
            {status === "pending" && renderPending()}
            {status === "error" && renderError()}
        </section>
    );
};
