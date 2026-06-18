import { useContext } from "react";
import { AuthContext } from "../../../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handelLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const response = await login(email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handelRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const response = await register(username, email, passworimport { useContext } from "react";
import { AuthContext } from "../../../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handelLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const response = await login(email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handelRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
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

    return {
        user,
        loading,
        handelLogin,
        handelRegister,
        handelLogout,
    };
};d);
            setUser(response.user);
        } catch (err) {
            console.log(err);
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

    return {
        user,
        loading,
        handelLogin,
        handelRegister,
        handelLogout,
    };
};