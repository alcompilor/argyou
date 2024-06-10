import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

const App = () => {
    const queryClient = new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <RouterProvider router={router} />
                </HelmetProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;
