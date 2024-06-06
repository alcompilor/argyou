export const addDebate = async (formData) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/debates`,
            {
                method: "POST",
                credentials: "include",
                body: formData,
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fetch request failed: ${error.message}`);
        throw error;
    }
};
