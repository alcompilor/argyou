import { AdminPanel } from "@/components/AdminPanel";

export const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <AdminPanel />
      </div>
    </div>
  );
};
