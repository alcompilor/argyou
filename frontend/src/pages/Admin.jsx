import { AdminPanel } from "@/components/AdminPanel";
import { Meta } from "@/components/Meta";

export const Admin = () => {
    return (
        <>
            <Meta
                title={"Argyou | Admin Panel"}
                desc={
                    "Welcome to Argyou Admin Panel. Here you can manage all the services and features offered by Argyou."
                }
                imgUrl={`${import.meta.env.VITE_SITE_URL}/default.png`}
            />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded-lg shadow-xl">
                    <AdminPanel />
                </div>
            </div>
        </>
    );
};
