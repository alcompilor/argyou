import { useState, useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { useQuery } from "@tanstack/react-query";
import { ProfileImage } from "./ProfileImage";

export const DebatesLog = () => {
  const [debatorData, setDebatorData] = useState({});
  const authUsername = useAuthState();

  const {
    data: debates,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userDebates", authUsername],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/${authUsername}/debates`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  useEffect(() => {
    const fetchDebateData = async () => {
      if (!debates || !debates.data) return;

      const newDebatorData = {};

      for (const debate of debates.data) {
        let username;
        if (!debatorData[debate.opponentUsername]) {
          username = debate.opponentUsername;
        } else if (!debatorData[debate.creatorUsername]) {
          username = debate.creatorUsername;
        }

        if (username) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${username}`,
              {
                credentials: "include",
              }
            );
            const debateUser = await response.json();
            newDebatorData[username] = debateUser;
          } catch (err) {
            console.error(err);
          }
        }
      }

      setDebatorData((prevData) => ({ ...prevData, ...newDebatorData }));
    };

    fetchDebateData();
  }, [debates]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!debates || debates.length === 0) {
    return <div>No debates found</div>;
  }

  return (
    <>
      {debates.data.map((debate, index) => {
        const startHour = new Date(debate.startTime).getUTCHours();
        const startMinute = new Date(debate.startTime).getUTCMinutes();
        const endHour = new Date(debate.endTime).getUTCHours();
        const endMinute = new Date(debate.endTime).getUTCMinutes();
        const startTime = `${startHour}:${
          startMinute < 10 ? "0" + startMinute : startMinute
        }`;
        const endTime = `${endHour}:${
          endMinute < 10 ? "0" + endMinute : endMinute
        }`;

        return (
          <div key={index} className="inline-block p-5">
            <div className="rounded mb-1 bg-gray-800 w-70">
              <div className="bg-rose-600 text-lg rounded flex justify-center items-center">
                <p className="text-white tracking-wider m-8">
                  {startTime} - {endTime}
                </p>
              </div>
              <div className="bg-gray-700 text-yellow-200 flex flex-row justify-center items-center pl-10 pr-10">
                <div className="flex flex-row justify-center items-center mt-2">
                  <div className="flex flex-col justify-center items-center">
                    {debatorData[debate.creatorUsername] ? (
                      <ProfileImage
                        userData={debatorData[debate.creatorUsername]["data"]}
                        size={"70px"}
                      />
                    ) : (
                      <div>Loading user image</div>
                    )}
                    <p className="p-3 inline-block">{debate.creatorUsername}</p>
                  </div>
                  <div className="pl-5 pr-5 mb-4">
                    <span className="text-2xl">VS</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {debatorData[debate.opponentUsername] ? (
                      <ProfileImage
                        userData={debatorData[debate.opponentUsername]["data"]}
                        size={"70px"}
                      />
                    ) : (
                      <div>Loading user image</div>
                    )}
                    <p className="p-3 inline-block">
                      {debate.opponentUsername}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
