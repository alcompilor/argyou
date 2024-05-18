import { useAuthState } from "@/hooks/useAuthState";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProfileImage } from "./ProfileImage";
import { UploadAvatar } from "./UploadAvatar";
import { DebatesLog } from "./DebatesLog";
import { ChangePassword } from "./ChangePassword";
import {
  IconSettings,
  IconCake,
  IconUser,
  IconTimelineEventText,
} from "@tabler/icons-react";

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("info");
  const authState = useAuthState();
  if (!authState) {
    return "Authentication failed";
  }

  const tabStyle =
    "inline-block p-4 rounded-t-lg dark:bg-gray-800 dark:text-rose-500";

  const { data, error } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${authState}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <div className="flex flex-row items-center gap-7 m-10">
        <div className="pl-12">
          <ProfileImage userData={data.data} size={"110px"} />
        </div>
        <div>
          <h5 className="text-2xl font-medium mt-5 text-gray-900 dark:text-white">
            {data.data.fullName}
          </h5>
          <span className="text-md text-rose-500 dark:text-gray-400 mb-3">
            @{data.data.username}
          </span>
          {data.data.inDebate ? (
            <>
              <p className="relative flex items-center text-sm text-green-500 dark:text-gray-400 mb-3 font-bold">
                <span className="absolute animate-ping h-4 w-3 rounded-full bg-green-200 mr-2" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 mr-2" />
                Engaging in a debate
              </p>
            </>
          ) : (
            <>
              <p className="relative flex items-center text-sm text-red-500 dark:text-gray-400 mt-2 font-bold">
                <span className="absolute animate-ping h-4 w-3 rounded-full bg-red-200 mr-2" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 mr-2" />
                Inactive
              </p>
            </>
          )}
        </div>
      </div>
      <ul className="flex flex-wrap text-sm font-medium text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-20">
        <li className="me-2">
          <a
            className={`${tabStyle} ${
              activeTab === "info"
                ? "text-rose-600 bg-gray-100"
                : "dark:bg-gray-800 dark:text-rose-500"
            }`}
            onClick={() => {
              setActiveTab("info");
            }}
          >
            <IconUser />
          </a>
        </li>
        <li className="me-2">
          <a
            className={`${tabStyle} ${
              activeTab === "debates"
                ? "text-rose-600 bg-gray-100"
                : "dark:bg-gray-800 dark:text-rose-500"
            }`}
            onClick={() => {
              setActiveTab("debates");
            }}
          >
            <IconTimelineEventText />
          </a>
        </li>
        <li className="me-2">
          <a
            className={`${tabStyle} ${
              activeTab === "settings"
                ? "text-rose-600 bg-gray-100"
                : "dark:bg-gray-800 dark:text-rose-500"
            }`}
            onClick={() => {
              setActiveTab("settings");
            }}
          >
            <IconSettings />
          </a>
        </li>
      </ul>
      <div className="mb-8">
      <div className={`pl-20 pr-20 ${activeTab !== "info" && "hidden"} -mt-1`}>
        <div className="bg-gray-100 p-4 text-sm font-bold">
          <div className="bg-yellow-200 rounded p-3 border-gray-200 border-5 w-fit mb-4 mt-1">
            <h1 className="max-w-lg font-medium mb-3">
              A passionate debater with a knack for dissecting arguments and
              crafting compelling narratives. I thrive in the heat of
              intellectual battles, where facts collide and ideas spark.
            </h1>
          </div>
          {data.data.specialization ? (
            <div className="p-2 rounded-lg bg-gray-700 text-white mb-4 max-w-24 hover:max-w-60 overflow-hidden transition-max-w duration-300">
              <p className="truncate hover:text-yellow-200 duration-300">
                Expertise {data.data.specialization}
              </p>
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-gray-700 mb-4 max-w-20">
              <p className="text-white hover:text-yellow-200 duration-300">Follower</p>
            </div>
          )}
          <h1 className="mb-3 text-rose-600">Email: {data.data.email}</h1>
          <h1 className="mb-3 text-rose-600">Phone number: +467 931 844-57</h1>
          <div className="mb-2">
            <p className="text-sm text-rose-600">
              <IconCake className="inline-block mb-2" />
              {data.data.birthDate.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`pl-20 pr-20 ${activeTab !== "debates" && "hidden"} -mt-1`}
      >
        <div className="bg-gray-100 p-4 text-sm font-bold">
          <DebatesLog />
        </div>
      </div>
      <div
        className={`pl-20 pr-20 ${activeTab !== "settings" && "hidden"} -mt-1`}
      >
        <div className="bg-gray-100 p-4 text-sm font-bold">
          <UploadAvatar userData={data.data} />
          <ChangePassword />
        </div>
      </div>
      </div>
      
    </>
  );
};
