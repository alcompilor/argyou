export const joinDebate = async ({id}) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/debates/${id}/viewer`,
            {
                credentials: "include",
                method: "PATCH",
            },
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Fetch request failed: ${error.message}`);
        throw error;
    }
};
