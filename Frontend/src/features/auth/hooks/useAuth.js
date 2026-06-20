import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";          // ✅ matches named export
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;  // ✅ now works, context exposes these

    const handelLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const response = await login(email, password);
            if (!response) return false;
            setUser(response.user);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handelRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const response = await register(username, email, password);
            if (!response) return false;
            setUser(response.user);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handelLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, []);

    return { user, loading, handelLogin, handelRegister, handelLogout };
};