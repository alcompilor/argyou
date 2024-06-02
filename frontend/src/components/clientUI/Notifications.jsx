import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconBell } from "@tabler/icons-react";
import { useAuthState } from "@/hooks/useAuthState";

export const Notifications = () => {
  const [visible, setVisibility] = useState(false);
  const [readNotifications, setReadNotifications] = useState(false);
  const username = useAuthState();

  const { data: userData, error } = useQuery({
    queryKey: ["userData", username],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${username}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (!userData || !userData.success) return;

    let newNotificationsExists = userData.data.notifications.some(
      (notification) => notification.status === "unread"
    );

    newNotificationsExists
      ? setReadNotifications(true)
      : setReadNotifications(false);

    if (readNotifications) {
      const notifications = userData.data.notifications.map((notification) => ({
        ...notification,
        status: "read",
      }));

      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/${username}/notifications`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifications),
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .catch((error) => console.error(error));
    }
  }, [userData, readNotifications]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData || !userData.success) {
    return "Loading notifications...";
  }

  function getDateAndTimeFormat(date) {
    const notificationTime = new Date(date);
    return (
      notificationTime.getFullYear() +
      "-" +
      notificationTime.getMonth() +
      "-" +
      notificationTime.getDay() +
      " " +
      notificationTime.getHours() +
      ":" +
      notificationTime.getMinutes()
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setVisibility(true)}
      onMouseLeave={() => {
        setVisibility(false);
      }}
    >
      <IconBell className="absolut text-white-500 fill-current hover:fill-rose-500" />
      {userData.success && visible && (
        <div
          className="max-w-70 h-fit bg-gray-100 absolute p-1 m-1 ml-2 duration-300 rounded-e-xl rounded-es-xl dark:bg-gray-700"
          style={{ zIndex: 1000 }}
        >
          {userData.data.notifications
            .slice()
            .reverse()
            .map((notification, index) => (
              <div key={index}>
                <div
                  className={`w-60 h-18 rounded dark:bg-gray-700 ${
                    notification.status === "unread"
                      ? "bg-red-200"
                      : "bg-gray-300"
                  }`}
                >
                  <div className="p-3 pt-3 w-fit">
                    <p className="text-black justify-center font-sans text-xs">
                      {notification.title}
                    </p>
                  </div>
                  <p className="pb-3 pr-3 text-rose-400 italic text-xs flex justify-end">
                    {getDateAndTimeFormat(notification.date)}
                  </p>
                </div>
                <hr className="h-1" />
              </div>
            ))}
        </div>
      )}
    </li>
  );
};
