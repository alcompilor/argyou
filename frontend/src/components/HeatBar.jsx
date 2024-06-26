import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

export const HeatBar = ({ debateId }) => {
    const {
        data: debateData,
        error,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["getDebate"],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/debates/${debateId}`,
                {
                    credentials: "include",
                },
            ).then((res) => res.json()),
    });

    return (
        <>
            {isSuccess && (
                <div
                    className="w-8 mt-4 bg-gray-200 rounded mb-4 dark:bg-gray-700 relative"
                    style={{ height: "530px" }}
                    key={debateData.data._id}
                >
                    <div
                        className={`${
                            debateData.data.heatScore < 0.33
                                ? "bg-green-400 dark:bg-green-500"
                                : debateData.data.heatScore < 0.66
                                  ? "bg-yellow-300 dark:bg-yellow-500"
                                  : debateData.data.heatScore < 1
                                    ? "bg-red-500 dark:bg-red-500"
                                    : "bg-gray-200 dark:bg-gray-400"
                        } w-3.5 rounded absolute bottom-0 duration-300`}
                        style={{
                            height: `${debateData.data.heatScore * 100}%`,
                        }}
                    ></div>
                </div>
            )}
            {error && <p>Error occurred loading the heatbar</p>}
            {isLoading && <Spinner animation="grow" />}
        </>
    );
};
