import { useAuthState } from "@/hooks/useAuthState";
import { useQuery } from "@tanstack/react-query";

export const DebatesLog = () => {
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
        }/api/v1/users/${authUsername}/debates`
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!debates || debates.length === 0) {
    return <div>No debates found</div>;
  }

  debates.data.forEach((element) => {
    console.log(element.title);
  });

  return (
    <>
      {debates.data.map((debate) => (
        <div className="grid-cols-3 inline-block p-5">
          <div key={debate.id} className="rounded mb-2 bg-gray-800">
            <div className="p-8 text-red-600 text-lg rounded">
              <p>
                {debate.startTime} - {debate.endTime}
              </p>
            </div>
            <hr />
            <div className="bg-blue-400">
              <div>
                {debate.creatorUsername}
                
              </div>
              VS {debate.opponentUsername}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
