// custom imports
import { UserState } from "."
import { getCookie } from "../../utils"
import { getUser, setCsrfToken, url } from "../api"

// third party
import { create } from "zustand"

export const useUserStore = create<UserState>((set, get) => ({
    id: "",
    name: "",
    email: "",
    projects: [],
    isAuthenticated: false,

    init: async () => {
        const user = await getUser()
        if (!user.id) { return get().signin("test@sponj3d.com", "TestUser2025:)") }
        set({...user})
    },

    signout: async () => {
        const state = get()

        const response = await fetch(`${url}/signout`, {
            method: "POST",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
            },
            credentials: "include",
        })

        if (response.ok) {
            set({ id: "", name: "", email: "", isAuthenticated: false })
        } else {
            console.error("Failed to sign out")
        }
    },

    signup: (user, password) => {},

    signin: async (email, password) => {
        const state = get()

        if (!email || !password) {
            return
        }
        
        const response = await (await fetch(`${url}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": await setCsrfToken(),
            },
            body: JSON.stringify({email, password}),
            credentials: "include",
        })).json()

        if (response.success) {
            set({ id: response.uid, isAuthenticated: true })
            state.init()
        } else {
            set({ isAuthenticated: false })
        }
    }
}))