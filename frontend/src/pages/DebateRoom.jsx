import { CommentSection } from "@/components/CommentSection";
import { Chat } from "@/components/clientUI/Chat";

export const DebateRoom = () => {
  return (
    <div className="bg-gray-700 pt-6 pb-32 flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center mb-1 items-center">
        <h2 className="text-3xl font-bold text-white">Debate Room</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full px-4">
        <div className="col-span-1">
          <Chat />
        </div>
        <div className="col-span-1">
          <CommentSection />
        </div>
      </div>
    </div>
  );
};
