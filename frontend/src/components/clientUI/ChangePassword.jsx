import { useAuthState } from "@/hooks/useAuthState";
import { useState } from "react";

export const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [result, setResult] = useState("");
  const authUsername = useAuthState();

  const updatePassword = async (e) => {
    e.preventDefault();
    if (newPassword === repeatPassword) {
        const formData = new FormData();
      formData.append("password", newPassword);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/${authUsername}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setResult("Failed to update the password");
        throw new Error(data.message || "Failed to update the profile image");
      }
      setResult("Password successfully updated");
    } else {
      setResult("Passwords doesn't match");
    }
  };

  return (
    <details className="w-fit bg-gray-700 text-yellow-200 rounded-lg p-2">
      <summary>Change Password</summary>
      <form className="mt-3" onSubmit={updatePassword}>
        <label htmlFor="newPassword">New password</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          className="h-5 rounded ml-2 text-red-500 mb-3"
          style={{ width: "200px" }}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          className="h-5 rounded ml-2 text-red-500 mb-3"
          style={{ width: "200px" }}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <br />
        <div className="flex flex-col items-end">
          {result}
          <button
            type="submit"
            className="rounded bg-white text-gray-500 p-1 mt-4 font-extrabold"
          >
            Submit
          </button>
        </div>
      </form>
    </details>
  );
};
