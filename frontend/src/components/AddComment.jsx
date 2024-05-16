import { addComment } from "@/services/addComment";
import { IconBubblePlus } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Spinner } from "flowbite-react";
import { useState } from "react";

export const AddComment = ({ id, refetchComments }) => {
    const { mutate, status } = useMutation({ mutationFn: addComment });
    const [content, setContent] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        mutate({ id, content });
        setContent("");
    };

    if (status === "success") {
        refetchComments();
    }

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const renderError = () => (
        <Alert color="failure">
            <span className="font-semibold">Something went wrong</span> — Unable
            to add comment
        </Alert>
    );

    const renderIdleOrSuccess = () => (
        <button
            type="submit"
            className="font-semibold inline-flex items-center rounded-lg bg-rose-500 px-4 py-2 text-center text-sm text-white hover:bg-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 gap-1"
        >
            <IconBubblePlus size={18} /> Comment
        </button>
    );

    const renderPending = () => (
        <Spinner color="pink" aria-label="Loading Spinner" />
    );

    return (
        <form className="mb-6 px-4" onSubmit={handleFormSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                <input
                    type="text"
                    id="comment"
                    className="px-0 w-full text-base text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Share your thoughts..."
                    required
                    autoFocus
                    minLength={5}
                    maxLength={500}
                    value={content}
                    onChange={handleInputChange}
                ></input>
            </div>
            {status === "error" && renderError()}
            {(status === "idle" || status === "success") &&
                renderIdleOrSuccess()}
            {status === "pending" && renderPending()}
        </form>
    );
};
