import { CommentSection } from "@/components/CommentSection";
import { Meta } from "@/components/Meta";
import { Chat } from "@/components/clientUI/Chat";
import { fetchDebate } from "@/services/fetchDebate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const DebateRoom = () => {
    const { id } = useParams();
    const { data, isSuccess } = useQuery({
        queryKey: ["debate-headline"],
        queryFn: () => fetchDebate(id),
    });

    return (
        <>
            <Meta
                title={`Argyou | ${isSuccess ? data.data.title : "Debate Room"}`}
                desc={`Welcome to the debate "${isSuccess ? data.data.title : "Debate Room"}" on Argyou. Participate and share your views.`}
                imgUrl={`${import.meta.env.VITE_SITE_URL}/default.png`}
            />
            <div className="bg-gray-700 pt-10 flex flex-col justify-center items-center min-h-screen">
                <h1 className="md:text-4xl font-bold text-white">
                    {isSuccess ? `Debate: ${data.data.title}` : "Debate Room"}
                </h1>
                <div className="flex md:flex-row flex-col md:items-start items-center gap-14 justify-center p-6 md:px-20 w-full my-7">
                    <Chat />
                    <CommentSection />
                </div>
            </div>
        </>
    );
};
