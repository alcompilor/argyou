export const fetchDebates = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/debates`,
            {
                credentials: "include",
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fetch request failed: ${error.message}`);
        throw error;
    }
};
