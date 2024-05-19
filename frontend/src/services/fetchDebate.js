export const fetchDebate = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/debates/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fetch request failed: ${error.message}`);
        throw error;
    }
};