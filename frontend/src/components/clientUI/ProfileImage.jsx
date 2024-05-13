import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "@/hooks/useAuthState";
import { IconUpload } from "@tabler/icons-react";

export const ProfileImage = ({ userData }) => {
  const username = useAuthState();
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: async (bufferFile) => {
      const formData = new FormData();
      formData.append("avatar", bufferFile);

      const res = await fetch (
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${username}`,
        {
          method: "PATCH",
          body: formData,
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

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    try {
      await uploadImageMutation.mutateAsync(imageFile);
      queryClient.invalidateQueries(["userData"]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  let imageBase64 = btoa(String.fromCharCode(...new Uint8Array(userData.avatar.buffer.data)));
  let imageUrl = `data:${userData.avatar.mime};base64,${imageBase64}`;

  return (
    <div className="relative pl-12 pt-3">
      <img
        className="w-32 h-32 rounded-full shadow-lg"
        src={imageUrl}
        alt="Profile image"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <label htmlFor="fileInput" className="cursor-pointer">
          <IconUpload className="text-rose-600 rounded" />
          <input
            id="fileInput"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};
