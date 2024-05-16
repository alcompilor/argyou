export const addComment = async ({ id, content }) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/v1/debates/${id}/comments`,
            {
                credentials: "include",
                method: "PATCH",
                body: JSON.stringify({ content }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
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