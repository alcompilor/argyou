import { AddDebate } from "@/components/AddDebate";
import { DebateGrid } from "@/components/DebateGrid";
import { useAuthState } from "@/hooks/useAuthState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DebateSpace = () => {
    const authState = useAuthState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState) {
            navigate("/login");
        }
    }, [authState, navigate]);

    return (
        <>
            <div className="flex flex-col gap-2 md:p-10 p-7">
                <h1 className="mb-4 text-3xl self-center font-extrabold leading-none tracking-tight text-zinc-900 md:text-4xl lg:text-4xl dark:text-white">
                    Debate Space
                </h1>
                <DebateGrid />
                <AddDebate />
            </div>
        </>
    );
};
