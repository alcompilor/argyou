import { useAuthState } from "@/hooks/useAuthState";
import { useState, useEffect } from "react";

export const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
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
      setResultColor("text-green-500");
      setResult("Password successfully updated");
    } else {
      setResultColor("text-red-500");
      setResult("Passwords don't match");
    }
  };

  useEffect(() => {
    setIsFormValid(newPassword !== "" && repeatPassword !== "");
  }, [newPassword, repeatPassword]);

  return (
    <details className="w-fit bg-gray-700 text-rose-200 rounded-lg p-2">
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
          <p className={`${resultColor}`}>{result}</p>
          <button
            type="submit"
            className={`rounded text-gray-500 ${isFormValid ? "bg-rose-200" : "bg-white"} p-1 mt-4 font-extrabold`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </details>
  );
};
