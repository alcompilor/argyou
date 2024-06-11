import { bufferToBase64 } from "@/utils/bufferToBase64";
import podcastSvg from "../assets/imgs/Podcast-cuate.svg";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { useMutation } from "@tanstack/react-query";
import { addOpponent } from "@/services/addOpponent";
import { joinDebate } from "@/services/joinDebate";
import { useNavigate } from "react-router-dom";

const parseDate = (startTime, endTime) => {
  try {
    const startDateObj = new Date(startTime);
    const endDateObj = new Date(endTime);
    const formattedStartDate = format(startDateObj, "dd MMM yyyy '@' hh:mm a");
    const formattedEndTime = format(endDateObj, "hh:mm a");

    return `${formattedStartDate} - ${formattedEndTime}`;
  } catch {
    return `${startTime} - ${endTime}`;
  }
};

export const DebateCard = ({
  id,
  title,
  creator,
  startTime,
  endTime,
  opponent,
  thumbnail = podcastSvg,
  viewers: initialViewers,
}) => {
  const authState = useAuthState();
  const { mutate, error, isSuccess } = useMutation({
    mutationFn: addOpponent,
  });

  const {
    mutate: mutateJoin,
    error: joinError,
    isSuccess: joinSucceeded,
  } = useMutation({
    mutationFn: joinDebate,
  });

  const [opponentUser, setOpponentUser] = useState(opponent);
  const [viewer, setViewer] = useState(initialViewers);
  const [base64Thumbnail, setBase64Thumbnail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (thumbnail && thumbnail.buffer) {
      const base64 = bufferToBase64(thumbnail.buffer.data);
      setBase64Thumbnail(base64);
    }
  }, [thumbnail]);

  useEffect(() => {
    if (isSuccess) {
      setOpponentUser(authState);
    }
    if (joinSucceeded) {
      setViewer((prevViewers) => [...prevViewers, authState]);
    }
  }, [authState, isSuccess, joinSucceeded]);

  const handleJoinBtn = () => {
    mutateJoin({ id, user: authState });
    navigate(`/room/${id}`);
  };

  const handleOpponentBtn = () => {
    mutate({ id, opponent: authState });
  };

  if (joinSucceeded) {
    console.log(viewer);
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <img
        className="rounded-t-lg"
        src={
          base64Thumbnail
            ? `data:${thumbnail.mime};base64,${base64Thumbnail}`
            : podcastSvg
        }
        alt="Debate Thumbnail"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
          Creator: <span className="font-semibold">@{creator}</span>
        </p>
        <p className="mb-3 font-medium text-gray-700 dark:text-gray-400">
          Opponent:{" "}
          <span className="font-semibold">
            {opponentUser ? `@${opponentUser}` : "No opponent yet"}
          </span>
        </p>
        <p className="mb-5 font-medium text-gray-700 dark:text-gray-400">
          Time:{" "}
          <span className="font-semibold">{parseDate(startTime, endTime)}</span>
        </p>
        {error && (
          <p className="text-rose-600 mb-5">
            Error: Couldn&apos;t assign you as an opponent
          </p>
        )}
        {joinError && (
          <p className="text-rose-600 mb-5">
            Error: Couldn&apos;t let you join the debate
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={handleJoinBtn}
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-center text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
          >
            Join Debate
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
          {!opponentUser && authState !== creator && (
            <button
              onClick={handleOpponentBtn}
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-center text-white bg-zinc-700 rounded-lg hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            >
              Become opponent
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
