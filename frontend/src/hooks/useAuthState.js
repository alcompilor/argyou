import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuthState = () => {
    const [authState, setAuthState] = useState(Boolean(Cookies.get("auth")));
    
    useEffect(() => {
        if (window.cookieStore) {
            const handleCookieChange = () => {
                const authCookie = Cookies.get("auth");
                setAuthState(Boolean(authCookie));
            };

            window.cookieStore.addEventListener("change", handleCookieChange);

            return () => {
                window.cookieStore.removeEventListener("change", handleCookieChange);
            };
        }
    }, []);

    return authState;
};
