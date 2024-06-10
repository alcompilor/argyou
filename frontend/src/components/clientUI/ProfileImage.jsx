import { bufferToBase64 } from "@/utils/bufferToBase64";

export const ProfileImage = ({ userData, size }) => {
    if (!userData.avatar) {
        return "Avatar not found";
    }

    const imageBase64 = bufferToBase64(userData.avatar.buffer.data);
    const imageUrl = `data:${userData.avatar.mime};base64,${imageBase64}`;

    return (
        <div className="relative pt-3">
            <img
                className={`w-32 h-32 rounded-full shadow-lg`}
                src={imageUrl}
                alt="Profile image"
                style={{ width: `${size}`, height: `${size}` }}
            />
        </div>
    );
};
