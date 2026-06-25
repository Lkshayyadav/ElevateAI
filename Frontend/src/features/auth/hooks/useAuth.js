import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const response = await login(email, password);
            if (!response) return false;
            setUser(response.user);
            return true;
        } catch {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        try {   
            setLoading(true);
            const response = await register(username, email, password);
            if (!response) return false;
            setUser(response.user);
            return true;
        } catch {
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (error) {
            console.error(error);
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

    return { user, loading, handleLogin, handleRegister, handleLogout };
};