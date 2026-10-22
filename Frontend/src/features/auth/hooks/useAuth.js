import { useDispatch } from "react-redux"
import { getme, login, register } from "../services/auth.api"
import { setErrors, setLoading, setUser } from "../auth.slice.js";

export function useAuth() {

    const dispatch = useDispatch();

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            const data = await register({ email, username, password })
        } catch (err) {
            dispatch(setErrors(err.response?.data?.message || "Registration failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));
            const data = await login({ email, password })
            console.log(data)
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setErrors(err.response?.data?.message || "Login failed."))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetme() {
        try {
            dispatch(setLoading(true));
            const data = await getme()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setErrors(err.response?.data?.message || "failed to fetch the user."))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetme
    }
}