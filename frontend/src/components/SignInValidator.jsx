import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export const SignInValidator = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                }
            );

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to log in");
            }

            onLoginSuccess(responseData);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="email" value="Your email" />
                <TextInput
                    id="email"
                    type="email"
                    placeholder="name@joedoe.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                />
            </div>
            <div>
                <Label htmlFor="password" value="Your password" />
                <TextInput
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="checkbox"
                    />
                    <Label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        Remember me
                    </Label>
                </div>
                <Button
                    type="submit"
                    color="failure"
                    className="bg-rose-500 hover:bg-rose-600"
                >
                    Sign In
                </Button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
    );
};