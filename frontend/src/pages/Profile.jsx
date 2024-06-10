import { Meta } from "@/components/Meta";
import { ProfileTabs } from "@/components/clientUI/ProfileTabs";

export const Profile = () => {
    return (
        <>
            <Meta title={"Argyou | Profile"} desc={"Welcome to your Argyou profile. Manage your account, view your debate history, and update your settings here."} imgUrl={`${import.meta.env.VITE_SITE_URL}/default.png`}/>
            <ProfileTabs />
        </>
    );
};