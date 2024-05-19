import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconUpload } from "@tabler/icons-react";
import maleAvatar from "../../assets/imgs/default-avatar-men.jpg";
import femaleAvatar from "../../assets/imgs/default-avatar-women.jpg";

export const UploadAvatar = ({ userData }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userData.avatar || userData.avatar === undefined) {
      let imgSrc;

      if (userData.gender === "male") {
        imgSrc = maleAvatar;
      } else if (userData.gender === "female") {
        imgSrc = femaleAvatar;
      }

      uploadDefaultAvatar(imgSrc);
    }
  }, [userData]);

  const uploadImageMutation = useMutation({
    mutationFn: async (bufferFile) => {
      const formData = new FormData();
      formData.append("avatar", bufferFile);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${userData.username}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update the profile image");
      }
      console.log("Image uploaded successfully:", data);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["uploadedImage"], data);
    },
  });

  const uploadFile = async (fileData) => {
    try {
      await uploadImageMutation.mutateAsync(fileData);
      queryClient.invalidateQueries(["userData"]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    await uploadFile(imageFile);
  };

  const uploadDefaultAvatar = async (imgSrc) => {
    fetch(imgSrc)
      .then(async (res) => {
        const blob = await res.blob();
        await uploadFile(blob);
      })
      .catch((error) =>
        console.error("Error uploading default avatar:", error)
      );
  };

  return (
    <label htmlFor="fileInput" className="inline-block">
      <div className="bg-gray-700 w-fit rounded-lg text-rose-200 mb-2 overflow-hidden">
        <div className="flex flex-row p-1">
          <IconUpload />
          <p className="ml-2 mt-1">Change Profile Image</p>
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </label>
  );
};
