import { useAuthState } from "@/hooks/useAuthState";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProfileImage } from "./ProfileImage";
import { IconSettings, IconCandle, IconUser, IconTimelineEventText } from "@tabler/icons-react";
import { DebatesLog } from "./DebatesLog";

export const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState('info');
  const authState = useAuthState();
  if (!authState) {
    return "Authentication failed";
  }

  const tabStyle = "inline-block p-4 rounded-t-lg dark:bg-gray-800 dark:text-rose-500";

  const { data, error } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${authState}`
      ).then((res) => res.json()),
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
        <ProfileImage userData={data.data} />
        <div>
          <h5 className="text-2xl font-medium mt-3 text-gray-900 dark:text-white">
            {data.data.fullName}
          </h5>
          <span className="text-md text-rose-500 dark:text-gray-400 mb-3">
            @{data.data.username}
          </span>
        </div>
      </div>
      <ul class="flex flex-wrap text-sm font-medium text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-20">
        <li class="me-2">
          <a
            className={`${tabStyle} ${activeTab === 'info' ? 'text-rose-600 bg-gray-100'
            : 'dark:bg-gray-800 dark:text-rose-500'}`}
            onClick={() => {setActiveTab('info')}}
          >
            <IconUser />
          </a>
        </li>
        <li class="me-2">
          <a
            className={`${tabStyle} ${activeTab === 'debates' ? 'text-rose-600 bg-gray-100'
            : 'dark:bg-gray-800 dark:text-rose-500'}`}
            onClick={() => {setActiveTab('debates')}}
          >
            <IconTimelineEventText />
          </a>
        </li>
        <li class="me-2">
          <a
            className={`${tabStyle} ${activeTab === 'settings' ? 'text-rose-600 bg-gray-100'
            : 'dark:bg-gray-800 dark:text-rose-500'}`}
            onClick={() => {setActiveTab('settings')}}
          >
            <IconSettings />
          </a>
        </li>
      </ul>
      <div className={`pl-20 pr-20 ${activeTab !== 'info' && 'hidden'}`}>
        <div className="bg-gray-100 p-4 text-sm font-bold">
          <h1 className="max-w-lg font-medium mb-3">
            A passionate debater with a knack for dissecting arguments and
            crafting compelling narratives. I thrive in the heat of intellectual
            battles, where facts collide and ideas spark.
          </h1>
          <h1 className="mb-3">
            Email: {data.data.email}
          </h1>
          <div className="mb-2">
            <p className="text-sm"><IconCandle className="text-rose-600 inline-block mb-3" />{data.data.birthDate.slice(0, 10)}</p>
          </div>
          <div className="p-2 rounded-lg bg-rose-500 text-white mt-2 max-w-24 hover:max-w-60 overflow-hidden transition-max-w duration-300">
            <p className="truncate">Expertise {data.data.specialization}</p>
          </div>
        </div>
      </div>
      <div className={`pl-20 pr-20 ${activeTab !== 'debates' && 'hidden'}`}>
        <div className="bg-gray-100 p-4 text-sm font-bold">
          <DebatesLog />
        </div>
      </div>
      <div className={`pl-20 pr-20 ${activeTab !== 'settings' && 'hidden'}`}>
        <div className="bg-gray-100 p-4 text-sm font-bold">
          asdasdasdasdasdads
        </div>
      </div>
      {/*<div className="flex flex-col items-start pb-5">
        
        <div>
          <h5 className="bg-rose-500 text-sm shadow font-medium text-white dark:text-white mb-3 rounded-lg">
            {data.data.specialization}
          </h5>
          {data.data.inDebate ? (
            <>
              <p className="flex items-center text-sm text-green-500 dark:text-gray-400 mb-3 font-bold">
                <span className="w-3 h-3 mr-2 bg-green-500 rounded-full" />
                Engaging in a debate
              </p>
            </>
          ) : (
            <>
              <p className="flex items-center text-sm text-red-500 dark:text-gray-400 mb-3 font-bold">
                <span className="w-3 h-3 mr-2 bg-red-500 rounded-full" />
                Inactive
              </p>
            </>
          )}
          <details className="mb-4">
            <summary className="font-bold text-gray-600 cursor-pointer focus:outline-none">
              Contact Information
            </summary>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1">
              <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                Email: {data.data.email}
                <br />
                Phone number: +467 902-645-22
              </h5>
            </div>
          </details>
        </div>
      </div>*/}
    </>
  );
};
