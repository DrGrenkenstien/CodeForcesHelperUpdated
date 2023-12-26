import { useContext, createContext } from "react";

const userContext = createContext({
    cfUsername: "",
    email: "",
    setCfUsername: () => {},
    setEmail: () => {}
})

export const UserContextProvider = userContext.Provider

export default function getUserContext() {
    return useContext(userContext)
}
