import { bufferToBase64 } from "@/utils/bufferToBase64";
import defaultThumbnail from "../../assets/imgs/Podcast-cuate.svg";

export const Thumbnail = ({ debate }) => {
  let imageUrl = defaultThumbnail;

  if (debate.thumbnail) {
    const imageBase64 = bufferToBase64(debate.thumbnail.buffer.data);
    imageUrl = `data:${debate.thumbnail.mime};base64,${imageBase64}`;
  }

  return (
    <div className="relative">
      <img
        className="shadow-lg object-cover"
        src={imageUrl}
        alt="Profile image"
        style={{ width: '292px', height: '170px' }}
      />
    </div>
  );
};
