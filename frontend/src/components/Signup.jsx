import { useState } from "react";
import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";

const Signup = ({ onSignupSuccess }) => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("birthDate", birthDate);
        formData.append("password", password);
        formData.append("gender", gender);
        if (avatar) {
            formData.append("avatar", avatar);
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(
                    responseData.error || "Failed to register user",
                );
            }

            setSuccess(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return "Your account has been created successfully. We're redirecting you to the login page...";
            });
            setTimeout(() => onSignupSuccess(), 6000);
        } catch (error) {
            setError(error.message || "Failed to sign up. Please try again.");
        }
    };

    return (
        <div className="container mx-auto mt-12 bg-white p-8 shadow-lg rounded-lg w-full max-w-3xl">
            <div className="header flex flex-col items-center gap-2 w-full my-5">
                <div className="text text-4xl font-bold text-gray-800">
                    Sign Up
                </div>
                <div className="underline w-16 h-1.5 bg-gray-800 rounded-full"></div>
            </div>
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                {success && <div className="text-green-500">{success}</div>}
                {error && <div className="text-red-500">{error}</div>}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fullName" value="Full Name" />
                    </div>
                    <TextInput
                        id="fullName"
                        type="text"
                        placeholder="Robert Green"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput
                        id="username"
                        type="text"
                        placeholder="robertgreen"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="name@flowbite.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birthDate" value="Birth Date" />
                    </div>
                    <TextInput
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="gender" value="Gender" />
                    </div>
                    <Select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="avatar" value="Avatar" />
                    </div>
                    <FileInput
                        id="avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        shadow={true}
                        sizing="md"
                        className="w-full"
                    />
                </div>
                <div className="submit-container flex justify-center mt-8">
                    <Button
                        type="submit"
                        className="text-white bg-rose-500 rounded-full w-56 h-12 font-bold hover:bg-rose-600"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
